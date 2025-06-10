import faiss
import glob
import json
from sentence_transformers import SentenceTransformer


def load_jsonl(file_path):
    with open(file_path, "r") as file:
        return [json.loads(line) for line in file]


def load_data(data_files):
    files = glob.glob(data_files)
    data = []
    for file in files:
        data.extend(load_jsonl(file))
    return data


data = load_data("docs/*.jsonl")
documents = [item["text"] for item in data]

model = SentenceTransformer("all-MiniLM-L6-v2")

doc_embeddings = model.encode(documents, convert_to_numpy=True)
index = faiss.IndexFlatL2(doc_embeddings.shape[1])
index.add(doc_embeddings)


def get_relevant_documents(query, k=3):
    query_embedding = model.encode([query], convert_to_numpy=True)
    _, indices = index.search(query_embedding, k)
    return [documents[i] for i in indices[0]]