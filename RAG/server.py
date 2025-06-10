import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from retrieval import get_relevant_documents

from openai_utils import (
    get_completion_openai,
    create_prompt,
    parse_response
)


app = Flask(__name__)
CORS(app)

num_references = int(os.getenv("NUM_REFERENCES", 4))


@app.route("/suggest", methods=["POST"])
def suggest_services():
    r"""Data:
    {
        "user_input": "...,
        "services": [
            {
                "name": "Service 1",
                "description": "Description of Service 1"
            },
            ...
        ]
    }
    """
    data = request.json
    user_input = data.get("user_input", None)
    services = data.get("services", None)
    
    if user_input is None or services is None:
        return jsonify({"error": "Missing data"}), 400
    
    services_str = [f"{service["name"]} - Mô tả: {service["description"]}" for service in services]
    
    references = get_relevant_documents(user_input, k=num_references)
    prompt = create_prompt(user_input, references, services_str)
    response = get_completion_openai(prompt)
    
    suugested_services = parse_response(response)
    response = "Các dịch vụ gợi ý:\n" + (
        response
        .replace("<s1>", "1. ")
        .replace("</s1>", "")
        .replace("<s2>", "2. ")
        .replace("</s2>", "")
        .replace("<s3>", "3. ")
        .replace("</s3>", "")
    )

    return jsonify({"response": response, "suggestions": suugested_services})


if __name__ == "__main__":
    app.run(host="0.0.0", port=8888, debug=True)