import os
from openai import OpenAI


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
num_suggestions = int(os.getenv("NUM_SUGGESTIONS", 3))
model = os.getenv("MODEL", "gpt-3.5-turbo")
temperature = float(os.getenv("TEMPERATURE", 0.0))
max_tokens = int(os.getenv("MAX_TOKENS", 500))

suggestion_prompt = "\n".join([f"<s{i+1}>[Tên dịch vụ {i+1}]</s{i+1}>" for i in range(num_suggestions)])


PROMPT_TEMPLATE = (
    "Bạn là một trợ lý y tế.\n"
    "Dựa vào thông tin tôi cung cấp và dữ liệu y khoa, hãy đưa ra gợi ý dịch vụ khám phù hợp (nếu có).\n"
    "Tôi đang gặp những triệu chứng/vấn đề sau:\n"
    "{0}\n"
    "Thông tin y khoa tham khảo:\n"
    "{1}\n"
    "Tôi nên đi khám dịch vụ nào trong các dịch vụ sau:\n"
    "{2}\n"
    f"Hãy đưa ra {num_suggestions} dịch vụ khám phù hợp nhất (không bắt buộc) theo định dạng:\n"
    f"{suggestion_prompt}\n"
    "Nếu không có dịch vụ nào phù hợp, bỏ qua bước này và đưa ra lời khuyên hợp lý, ngắn gọn.\n"
    "Nếu có, hãy giải thích lý do tại sao lại chọn các dịch vụ này và không giải thích lý do không chọn các dịch vụ khác."
)


def create_reference_prompt(docs):
    return "\n".join([f"Tài liệu {i+1}: {doc}" for i, doc in enumerate(docs)])


def create_service_prompt(services):
    return "\n".join([f"Dịch vụ {i+1}: {service}" for i, service in enumerate(services)])


def create_prompt(user_input, reference_docs, services):
    return PROMPT_TEMPLATE.format(
        user_input,
        create_reference_prompt(reference_docs),
        create_service_prompt(services)
    )


def get_completion_openai(prompt):
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        max_tokens=max_tokens
    )
    return response.choices[0].message.content


def parse_response(response):
    import re
    pattern = r"<s(\d)>(.*?)</s\1>"
    matches = re.findall(pattern, response, re.DOTALL)
    services = [match.strip() for _, match in matches]
    return services