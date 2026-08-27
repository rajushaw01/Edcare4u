import os
import json
import re
from google import genai
from google.genai import types


_client = None


def get_client():
    global _client
    if _client is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY environment variable is not set. "
                "Please set it in your .env file."
            )
        _client = genai.Client(api_key=api_key)
    return _client


def generate_quiz(ocr_text, num_questions=10):
    client = get_client()

    prompt = f"""You are an educational quiz generator. Based ONLY on the following text extracted from images, generate a quiz with {num_questions} multiple-choice questions.

Rules:
- Generate questions strictly from the provided content
- Do not add information not present in the text
- Each question must have exactly 4 options
- Mark the correct answer exactly as one of the 4 options
- Provide a brief explanation for each correct answer
- Assign difficulty level: easy, medium, or hard
- Give the quiz a descriptive title based on the content

Return ONLY valid JSON in this exact format, no markdown, no code blocks:
{{
  "quiz_title": "Quiz Title Here",
  "questions": [
    {{
      "question": "Question text here?",
      "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
      "correct_answer": "Option A text",
      "explanation": "Explanation of the correct answer",
      "difficulty": "medium"
    }}
  ]
}}

Text content:
{ocr_text}"""

    try:
        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=8192,
            ),
        )

        raw_text = response.text.strip()

        raw_text = re.sub(r"```json\s*", "", raw_text)
        raw_text = re.sub(r"```\s*$", "", raw_text)
        raw_text = raw_text.strip()

        quiz_data = json.loads(raw_text)

        if "questions" not in quiz_data or not isinstance(quiz_data["questions"], list):
            raise ValueError("Invalid quiz structure: missing 'questions' array")

        if "quiz_title" not in quiz_data:
            quiz_data["quiz_title"] = "Generated Quiz"

        for q in quiz_data["questions"]:
            required_fields = ["question", "options", "correct_answer", "explanation", "difficulty"]
            for field in required_fields:
                if field not in q:
                    raise ValueError(f"Missing field '{field}' in question")

            if not isinstance(q["options"], list) or len(q["options"]) != 4:
                raise ValueError(f"Question must have exactly 4 options")

        return quiz_data

    except json.JSONDecodeError as e:
        raise ValueError(f"Gemini returned invalid JSON. Raw response could not be parsed.")
    except Exception as e:
        if "GEMINI_API_KEY" in str(e):
            raise
        raise ValueError(f"Quiz generation failed: {str(e)}")
