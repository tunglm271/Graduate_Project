import csv
import json

# Mở file CSV đầu vào
with open('./docs/diease.csv', 'r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    # Mở file JSONL đầu ra
    with open('./docs/disease.jsonl', 'w', encoding='utf-8') as jsonlfile:
        for row in reader:
            json_line = json.dumps({'text': row['text']}, ensure_ascii=False)
            jsonlfile.write(json_line + '\n')
