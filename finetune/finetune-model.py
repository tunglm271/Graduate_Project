from datasets import load_dataset
from transformers import AutoModelForSequenceClassification, AutoTokenizer, TrainingArguments, Trainer
import numpy as np
import evaluate  # Thay thế load_metric
import torch

# Kiểm tra GPU có sẵn không
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)

# Load dataset MNLI từ Hugging Face
dataset = load_dataset("glue", "mnli")

# Load tokenizer và model BERT
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=3).to(device)  # Chuyển model sang GPU nếu có

# Hàm tokenize dữ liệu
def tokenize_function(example):
    tokenized = tokenizer(example["premise"], example["hypothesis"], truncation=True, padding="max_length")
    tokenized["labels"] = example["label"]  # Đổi tên label để tránh lỗi
    return tokenized

# Tokenize toàn bộ dataset
tokenized_datasets = dataset.map(tokenize_function, batched=True)
tokenized_datasets = tokenized_datasets.remove_columns(["premise", "hypothesis"])  # Xóa cột dư thừa

# Shuffle tập train
train_dataset = tokenized_datasets["train"].shuffle(seed=42)
valid_dataset = tokenized_datasets["validation_matched"]

# Load metric để đánh giá (Accuracy)
metric = evaluate.load("glue", "mnli")

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)

# Cấu hình huấn luyện
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=3,
    weight_decay=0.01,
    logging_dir="./logs",
    save_total_limit=2,  # Chỉ lưu 2 checkpoint gần nhất
    load_best_model_at_end=True,
    logging_steps=50,
)

# Khởi tạo Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=valid_dataset,
    compute_metrics=compute_metrics,  # Thêm đánh giá
)

# Bắt đầu fine-tune
trainer.train()

# Lưu mô hình đã fine-tune
trainer.save_model("./mnli-bert-model")
tokenizer.save_pretrained("./mnli-bert-model")  # Lưu tokenizer để inference sau này
