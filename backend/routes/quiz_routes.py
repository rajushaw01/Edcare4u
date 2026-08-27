import os
from flask import Blueprint, request

from utils.response import success_response, error_response
from services.gemini_service import generate_quiz

quiz_bp = Blueprint("quiz", __name__)


@quiz_bp.route("/generate-quiz", methods=["POST"])
def generate():
    data = request.get_json()
    if not data:
        return error_response("Request body is required.")

    ocr_text = data.get("ocr_text", "").strip()
    if not ocr_text:
        return error_response("OCR text is required to generate a quiz.")

    num_questions = data.get("num_questions", 10)
    if not isinstance(num_questions, int) or num_questions < 1 or num_questions > 50:
        num_questions = 10

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        return error_response(
            "Gemini API key is not configured. "
            "Please set GEMINI_API_KEY in your .env file."
        )

    try:
        quiz = generate_quiz(ocr_text, num_questions=num_questions)
        return success_response({
            "ocr_text": ocr_text,
            "quiz": quiz
        })
    except ValueError as e:
        return error_response(str(e), 500)
    except Exception as e:
        return error_response("Failed to generate quiz. Please try again.", 500)
