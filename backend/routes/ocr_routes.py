import os
from flask import Blueprint, request, current_app

from utils.file_utils import allowed_file, cleanup_files
from utils.response import success_response, error_response
from services.ocr_service import extract_text_from_images

ocr_bp = Blueprint("ocr", __name__)


@ocr_bp.route("/ocr", methods=["POST"])
def process_ocr():
    if "files" not in request.files:
        return error_response("No files provided. Please upload at least one JPEG image.")

    files = request.files.getlist("files")
    files = [f for f in files if f.filename]

    if not files:
        return error_response("No files selected. Please choose at least one JPEG image.")

    saved_paths = []
    try:
        upload_folder = current_app.config["UPLOAD_FOLDER"]

        for f in files:
            if not allowed_file(f.filename):
                return error_response(
                    f"Unsupported file type: '{f.filename}'. Only .jpg and .jpeg are allowed."
                )

        for f in files:
            safe_name = f.filename.replace(" ", "_")
            save_path = os.path.join(upload_folder, safe_name)
            f.save(save_path)
            saved_paths.append(save_path)

        ocr_result = extract_text_from_images(saved_paths)

        has_any_text = any(r["success"] and r["text"].strip() for r in ocr_result["ocr_results"])
        if not has_any_text:
            return error_response(
                "No text could be extracted from any of the uploaded images. "
                "Please ensure the images contain readable text."
            )

        return success_response(ocr_result)

    except Exception as e:
        return error_response(f"Processing failed: {str(e)}", 500)

    finally:
        cleanup_files(saved_paths)
