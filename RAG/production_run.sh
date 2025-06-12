export OPENAI_API_KEY=... \
export NUM_SUGGESTIONS=2 \
export NUM_REFERENCES=3 \
export MODEL=gpt-3.5-turbo \
export TEMPERATURE=0.5 \
export MAX_TOKENS=100 \
gunicorn -w 4 -b 0.0.0.0:8888 server:app