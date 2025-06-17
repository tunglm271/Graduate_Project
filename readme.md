# 🚀 Hướng dẫn chạy ứng dụng với Docker Compose

Ứng dụng bao gồm 4 dịch vụ chính:

- **frontend**: Giao diện người dùng (React/Vite)
- **backend**: API sử dụng Laravel
- **db**: PostgreSQL
- **rag**: Dịch vụ phụ trợ RAG (Retrieval-Augmented Generation)

---

## 🧱 Yêu cầu

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## ⚙️ Cách chạy ứng dụng

```bash
docker-compose up --build
```
