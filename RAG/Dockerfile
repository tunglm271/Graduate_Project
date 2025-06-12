# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the application will run on
EXPOSE 8888

# (Optional) Set default environment variables (these can be overwritten at runtime)
ENV OPENAI_API_KEY=... \
    NUM_SUGGESTIONS=2 \
    NUM_REFERENCES=3 \
    MODEL=gpt-4o-mini \
    TEMPERATURE=0.5 \
    MAX_TOKENS=300

# Run the application
CMD ["python", "server.py"]