import faiss
import glob
import json
import logging
from sentence_transformers import SentenceTransformer

# Thiết lập logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

def load_jsonl(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        return [json.loads(line) for line in file]

def load_data(data_files):
    files = glob.glob(data_files)
    data = []
    logging.info(f"Found {len(files)} file(s).")
    for file in files:
        logging.info(f"Loading file: {file}")
        records = load_jsonl(file)
        data.extend(records)
        logging.info(f"Loaded {len(records)} records from {file}")
    return data

logging.info("Loading data...")
data = load_data("docs/*.jsonl")
documents = [item["text"] for item in data]
logging.info(f"Total documents loaded: {len(documents)}")

model = SentenceTransformer("all-MiniLM-L6-v2")

logging.info("Encoding documents...")
doc_embeddings = model.encode(documents, convert_to_numpy=True)
index = faiss.IndexFlatL2(doc_embeddings.shape[1])
index.add(doc_embeddings)
logging.info(f"Index built with {index.ntotal} documents.")

def get_relevant_documents(query, k=3):
    logging.info(f"Searching top {k} documents for query: {query}")
    query_embedding = model.encode([query], convert_to_numpy=True)
    _, indices = index.search(query_embedding, k)
    results = [documents[i] for i in indices[0]]
    logging.info("Search completed.")
    return results
