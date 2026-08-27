import os
import sys

os.environ.setdefault("KMP_DUPLICATE_LIB_OK", "TRUE")

backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, backend_dir)

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from routes.ocr_routes import ocr_bp
from routes.quiz_routes import quiz_bp

project_root = os.path.dirname(backend_dir)
load_dotenv(os.path.join(project_root, ".env"))

def create_app():
    app = Flask(__name__)

    app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024
    app.config["UPLOAD_FOLDER"] = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads"
    )

    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

    CORS(app, origins=["http://localhost:5173"])

    app.register_blueprint(ocr_bp, url_prefix="/api")
    app.register_blueprint(quiz_bp, url_prefix="/api")

    @app.errorhandler(413)
    def too_large(e):
        return jsonify({
            "success": False,
            "data": None,
            "error": {"message": "File too large. Maximum size is 16MB per file."}
        }), 413

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({
            "success": False,
            "data": None,
            "error": {"message": "Endpoint not found."}
        }), 404

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({
            "success": False,
            "data": None,
            "error": {"message": "Internal server error."}
        }), 500

    return app


if __name__ == "__main__":
    app = create_app()
    print("Starting Edcare4u Backend on http://localhost:5000")
    app.run(debug=True, port=5000)
