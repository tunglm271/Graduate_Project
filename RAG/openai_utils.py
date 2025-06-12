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
    "Các dịch vụ khám hiện có:\n"
    "{2}\n"
    f"Hãy đưa ra {num_suggestions} dịch vụ khám phù hợp nhất trong các dịch vụ sau (không bắt buộc) theo định dạng:\n"
    f"{suggestion_prompt}\n"
    "Nếu không có dịch vụ nào phù hợp trong danh sách, hãy bỏ qua việc đề xuất dịch vụ và thay vào đó đưa ra lời khuyên y tế hợp lý, ngắn gọn."
    "Đối với mỗi dịch vụ được đề xuất, hãy giải thích rõ lý do lựa chọn. Trong phần giải thích, vui lòng nêu rõ (nếu có thể) triệu chứng của tôi có thể là dấu hiệu của bệnh gì và tại sao dịch vụ khám được chọn lại phù hợp với triệu chứng đó. Không cần giải thích lý do không chọn các dịch vụ khác.\n"
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