import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "..", "EasyOCR"))

import easyocr
import threading

_reader = None
_reader_lock = threading.Lock()


def get_reader():
    global _reader
    if _reader is None:
        with _reader_lock:
            if _reader is None:
                _reader = easyocr.Reader(["en"], gpu=False)
    return _reader


def extract_text_from_images(image_paths):
    reader = get_reader()
    results = []
    combined_parts = []

    for idx, image_path in enumerate(image_paths, 1):
        filename = os.path.basename(image_path)
        try:
            ocr_result = reader.readtext(image_path, detail=0)
            text = "\n".join(ocr_result) if ocr_result else ""
            results.append({
                "filename": filename,
                "text": text,
                "success": True,
                "error": None
            })
            combined_parts.append(f"Image {idx}:\n{text}")
        except Exception as e:
            results.append({
                "filename": filename,
                "text": "",
                "success": False,
                "error": f"OCR failed for {filename}: {str(e)}"
            })
            combined_parts.append(f"Image {idx}:\n[OCR failed for this image]")

    combined_text = "\n\n".join(combined_parts)

    return {
        "images_processed": len(image_paths),
        "ocr_results": results,
        "combined_text": combined_text
    }
