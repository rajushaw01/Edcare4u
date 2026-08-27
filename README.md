python backend/app.py
cd frontend
npm run dev





# Edcare4u - AI Quiz Generator

Upload study material images, extract text with OCR, and generate interactive quizzes powered by Google Gemini.

## Architecture

```
React Frontend (Vite)
        │
        │ JPEG Images
        ▼
 Flask Backend (Port 5000)
        │
        ▼
    EasyOCR (Text Extraction)
        │
        ▼
 Combined OCR Text
        │
        ▼
 Google Gemini API (Quiz Generation)
        │
        ▼
 Structured Quiz JSON
        │
        ▼
 Interactive Quiz in React
        │
        ▼
 Score + Answer Review
```

## Prerequisites

- Python 3.11+
- Node.js 18+
- Conda (recommended)
- Google Gemini API key ([Get one here](https://ai.google.dev/))

## Setup

### 1. Create Conda Environment

```bash
conda create -n Edcare4u python=3.11 -y
conda activate Edcare4u
```

### 2. Install Backend Dependencies

```bash
cd Edcare4u
pip install -r backend/requirements.txt
pip install -e ./EasyOCR
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Configure Environment

```bash
copy .env.example .env
```

Edit `.env` and add your Gemini API key:

```
GEMINI_API_KEY=your_actual_api_key_here
```

### 5. Start Backend

Open a terminal:

```bash
conda activate Edcare4u
cd Edcare4u
python backend/app.py
```

Backend runs on `http://localhost:5000`

### 6. Start Frontend

Open another terminal:

```bash
conda activate Edcare4u
cd Edcare4u/frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### POST /api/ocr

Upload JPEG images for text extraction.

- **Request**: `multipart/form-data` with `files` field
- **Response**: Combined OCR text + per-image results

### POST /api/generate-quiz

Generate a quiz from extracted text.

- **Request**: `application/json` with `ocr_text` field
- **Response**: Structured quiz JSON with questions, options, answers, explanations

## How It Works

1. **Upload**: Select one or more JPEG images of study material
2. **OCR**: EasyOCR extracts text from each image
3. **Quiz Generation**: Gemini AI creates multiple-choice questions from the text
4. **Take Quiz**: Answer questions with previous/next navigation
5. **Results**: View your score with percentage and performance message
6. **Review**: See correct/incorrect answers with explanations

## File Structure

```
Edcare4u/
├── frontend/          React + Vite
├── backend/           Flask API
│   ├── routes/        API endpoints
│   ├── services/      OCR + Gemini
│   └── utils/         Helpers
├── EasyOCR/           Local OCR library
├── uploads/           Temp files (gitignored)
├── .env               API keys (gitignored)
└── README.md
```

## Troubleshooting

**EasyOCR model download**: First run may download model weights (~100MB). Be patient.

**Gemini API errors**: Ensure your API key is valid and has quota.

**CORS errors**: Make sure the backend is running on port 5000.

**File upload fails**: Maximum file size is 16MB per file. Only .jpg/.jpeg supported.

## License

MIT
