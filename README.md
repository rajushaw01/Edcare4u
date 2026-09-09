# Edcare4u - AI-Powered Quiz Generator

Transform your study materials into interactive quizzes using AI. Upload images of notes, textbooks, or handwritten content — EasyOCR extracts the text, and Google Gemini generates intelligent multiple-choice questions with explanations.

![Quiz Page Screenshot](images/Quiz-page%20Screenshot.png)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Quiz Interface Features](#quiz-interface-features)
- [API Reference](#api-reference)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Features

### Core Functionality
- **Image Upload** — Drag-and-drop or click-to-browse for JPEG images of study material
- **OCR Text Extraction** — EasyOCR processes images locally on CPU to extract readable text
- **AI Quiz Generation** — Google Gemini 3.6 Flash creates contextual multiple-choice questions from extracted text
- **Detailed Explanations** — Each question includes an explanation of the correct answer

### Exam-Style Interface
- **Competitive Exam UI** — Professional interface inspired by JEE/NEET/GATE exam portals
- **Question Palette** — Color-coded grid showing answered, not answered, not visited, and marked-for-review questions
- **Countdown Timer** — 60-minute timer that turns red in the final 5 minutes and auto-submits at zero
- **Mark for Review** — Flag questions for later review with visual indicators
- **Clear Response** — Reset your answer on any question
- **Calculator Widget** — Built-in floating calculator for numerical problems
- **Question Paper View** — Modal to see all questions at once
- **Exam Instructions** — Detailed instructions modal for exam guidelines

### Results & Review
- **Score Display** — Animated circular progress ring with percentage and correct/incorrect/total counts
- **Performance Feedback** — Dynamic messages based on score (Outstanding 90%+, Great 70%+, Good 50%+, Needs Work <50%)
- **Answer Review** — Question-by-question review with correct answers, your answers, and explanations
- **Retake Quiz** — Reset and start fresh with new images

### UX & Design
- **Responsive Design** — Works on desktop, tablet, and mobile devices
- **Tailwind CSS v4** — Modern utility-first styling with custom theme tokens
- **Inter Font** — Clean, professional typography
- **Glassmorphism Navbar** — Semi-transparent navigation with backdrop blur
- **Smooth Animations** — Fade-in and slide-in transitions throughout the app
- **Mobile Sidebar** — Full-screen overlay drawer on mobile devices

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI library |
| Vite | 6.0 | Build tool & dev server |
| Tailwind CSS | 4.3 | Utility-first CSS framework |
| React Router | 6.28 | Client-side routing |
| Axios | 1.7 | HTTP client for API calls |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Runtime |
| Flask | 3.1 | Web framework |
| Flask-CORS | 5.0 | Cross-origin resource sharing |
| EasyOCR | Local clone | OCR text extraction (CPU mode) |
| Google Gemini | 3.6 Flash | AI quiz generation |
| Pillow | 10.0+ | Image processing |
| python-dotenv | 1.1 | Environment variable management |

### Development Tools
- **Conda** — Python environment management
- **Node.js 18+** — JavaScript runtime for frontend

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                     │
│                  http://localhost:5173                        │
│                                                             │
│  UploadPage → ProcessingPage → ExamScreen → ResultsPage     │
│                  │                    │          │           │
└──────────────────┼────────────────────┼──────────┼───────────┘
                   │                    │          │
              JPEG Images          JSON Quiz    JSON Quiz
                   │                    │          │
                   ▼                    ▼          ▼
┌─────────────────────────────────────────────────────────────┐
│                  Flask Backend (Port 5000)                   │
│                                                             │
│  POST /api/ocr          POST /api/generate-quiz             │
│       │                        │                            │
│       ▼                        ▼                            │
│  EasyOCR Service        Gemini Service                      │
│  (Local, CPU)           (gemini-3.6-flash)                  │
│       │                        │                            │
│       ▼                        ▼                            │
│  Combined OCR Text      Structured Quiz JSON                │
└─────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**
- **Stateless Backend** — No database; images are processed and immediately deleted
- **Thread-Safe Singletons** — EasyOCR reader and Gemini client are lazily initialized once
- **Local OCR** — EasyOCR runs entirely on your machine (no external API for text extraction)
- **Vite Proxy** — Frontend proxies `/api` requests to the backend, avoiding CORS issues in development

---

## Project Structure

```
Edcare4u/
├── frontend/                          # React + Vite application
│   ├── public/
│   │   └── favicon.svg                # Gradient "E4U" logo
│   ├── src/
│   │   ├── main.jsx                   # App entry point
│   │   ├── App.jsx                    # Route definitions
│   │   ├── App.css                    # Global styles, animations
│   │   ├── index.css                  # Tailwind config & theme tokens
│   │   ├── context/
│   │   │   └── QuizContext.jsx        # Global state (useReducer)
│   │   ├── data/
│   │   │   └── examData.js            # Quiz-to-exam data transformer
│   │   ├── hooks/
│   │   │   ├── useCountdown.js        # Timer countdown hook
│   │   │   └── useQuestionStatus.js   # Question status tracking
│   │   ├── pages/
│   │   │   ├── UploadPage.jsx         # Landing page + image upload
│   │   │   ├── ProcessingPage.jsx     # OCR + quiz generation pipeline
│   │   │   ├── QuizPage.jsx           # Simple quiz UI (legacy)
│   │   │   ├── ResultsPage.jsx        # Score display
│   │   │   └── ReviewPage.jsx         # Answer review with explanations
│   │   └── components/
│   │       ├── Navbar.jsx             # Fixed top navigation
│   │       ├── Footer.jsx             # Dark footer with links
│   │       ├── HeroSection.jsx        # Hero banner with CTAs
│   │       ├── HowItWorks.jsx         # 3-step process section
│   │       ├── Features.jsx           # 4-feature grid
│   │       ├── ImageUploader.jsx      # Drag-and-drop upload zone
│   │       ├── ImagePreview.jsx       # Thumbnail grid with remove
│   │       ├── ProgressStepper.jsx    # Processing pipeline stepper
│   │       ├── QuizProgress.jsx       # Simple progress bar
│   │       ├── QuizQuestion.jsx       # Question + options display
│   │       ├── ResultsCard.jsx        # Score ring + stats
│   │       └── exam/                  # Exam-style interface
│   │           ├── ExamScreen.jsx     # Main exam orchestrator
│   │           ├── TopBar.jsx         # Subject name + action buttons
│   │           ├── GroupTabsBar.jsx   # Group tabs + toolbar
│   │           ├── SectionTabsBar.jsx # Section tabs
│   │           ├── TimerBar.jsx       # Countdown display
│   │           ├── MarksInfoBar.jsx   # Marks/negative info
│   │           ├── QuestionPanel.jsx  # Question + radio options
│   │           ├── BottomActionBar.jsx# Action buttons
│   │           ├── Sidebar.jsx        # Right sidebar (desktop+mobile)
│   │           ├── CandidateBlock.jsx # Candidate info card
│   │           ├── LegendGrid.jsx     # Status color legend
│   │           ├── QuestionPalette.jsx# Numbered question grid
│   │           ├── CalculatorWidget.jsx# Floating calculator
│   │           ├── QuestionPaperModal.jsx  # All questions modal
│   │           ├── InstructionsModal.jsx   # Exam instructions
│   │           ├── UsefulDataModal.jsx     # Reference data
│   │           ├── SubmitConfirmModal.jsx  # Submit confirmation
│   │           └── TimeUpModal.jsx         # Auto-submit on timeout
│   ├── vite.config.js                 # Vite + Tailwind config
│   └── package.json                   # Dependencies
│
├── backend/                           # Flask API server
│   ├── app.py                         # Flask app factory & entry point
│   ├── requirements.txt               # Python dependencies
│   ├── routes/
│   │   ├── ocr_routes.py              # POST /api/ocr
│   │   └── quiz_routes.py             # POST /api/generate-quiz
│   ├── services/
│   │   ├── ocr_service.py             # EasyOCR integration
│   │   └── gemini_service.py          # Google Gemini integration
│   └── utils/
│       ├── file_utils.py              # File validation & cleanup
│       └── response.py                # Standardized API responses
│
├── EasyOCR/                           # Local EasyOCR clone (from source)
├── images/                            # Project screenshots
│   └── Quiz-page Screenshot.png
├── uploads/                           # Temp files (gitignored)
├── .env                               # API keys (gitignored)
├── .env.example                       # Environment template
├── .gitignore
├── Copy_of_nllb_200_distilled_600M.ipynb  # NLLB translation notebook
└── README.md
```

**Component Count:** 30 React components (12 shared + 18 exam-specific), 5 pages, 2 custom hooks

---

## Prerequisites

- **Python** 3.11 or higher
- **Node.js** 18 or higher
- **Conda** (recommended for Python environment management)
- **Google Gemini API key** — [Get one here](https://ai.google.dev/)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Edcare4u.git
cd Edcare4u
```

### 2. Create Conda Environment

```bash
conda create -n Edcare4u python=3.11 -y
conda activate Edcare4u
```

### 3. Install Backend Dependencies

```bash
pip install -r backend/requirements.txt
pip install -e ./EasyOCR
```

> **Note:** The EasyOCR package is included as a local clone in the repository. The `-e` flag installs it in editable mode.

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 5. Configure Environment Variables

```bash
copy .env.example .env
```

Edit `.env` and add your Gemini API key:

```
GEMINI_API_KEY=your_actual_api_key_here
```

### 6. Start the Backend Server

Open a terminal:

```bash
conda activate Edcare4u
python backend/app.py
```

Backend runs on **http://localhost:5000**

### 7. Start the Frontend Dev Server

Open a **new** terminal:

```bash
conda activate Edcare4u
cd frontend
npm run dev
```

Frontend runs on **http://localhost:5173**

### 8. Open the App

Navigate to **http://localhost:5173** in your browser.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Your Google Gemini API key for quiz generation |

**Obtaining a Gemini API Key:**
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and paste it in your `.env` file

---

## How It Works

### User Flow

```
1. UPLOAD          2. PROCESS           3. QUIZ            4. RESULTS         5. REVIEW
┌──────────┐     ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│ Drop your │────▶│ OCR + AI │────▶│  Answer  │────▶│  Score   │────▶│ Detailed │
│  images   │     │Working...│      │questions │      │  Ring    │      │  Review  │
└──────────┘     └──────────┘      └──────────┘      └──────────┘      └──────────┘
   JPEG only       ~10-30 sec       60 min timer     % + Stats        Q-by-Q
```

### Step-by-Step Walkthrough

1. **Upload** — Select one or more JPEG images of your study material (lecture notes, textbook pages, handwritten notes). Preview thumbnails appear in a grid; remove any image by hovering and clicking the X button.

2. **Processing** — The app shows a progress stepper with 6 stages:
   - Uploading images to server
   - Running EasyOCR text extraction
   - Combining extracted text from all images
   - Sending content to Gemini AI
   - Generating quiz questions
   - Preparing results

3. **Quiz Taking** — A professional exam interface loads with a 60-minute countdown timer. Navigate questions using the color-coded palette sidebar. Mark questions for review, use the built-in calculator, or view all questions at once via the Question Paper modal.

4. **Results** — After submitting (or when time runs out), view your score displayed as an animated circular progress ring with correct/incorrect/total counts and a performance message.

5. **Review** — Go through each question to see your answer, the correct answer, and a detailed explanation of why the correct answer is right.

---

## Quiz Interface Features

The exam interface replicates a competitive exam environment (like JEE/NEET/GATE portals):

### Top Bar
- Subject name display
- Question Paper, Instructions, and Useful Data buttons

### Timer
- 60-minute countdown
- Turns **red** when 5 minutes or less remain
- Auto-submits when time expires

### Question Panel
- Full question text
- 4 radio button options (A, B, C, D)
- Custom styled selection indicators

### Action Buttons
| Button | Action |
|--------|--------|
| **Mark for Review & Next** | Flags question and moves to next |
| **Clear Response** | Resets your selected answer |
| **Save & Next** | Saves answer and moves to next |

### Sidebar
- **Candidate Info** — Student name and applicant ID
- **Legend Grid** — Color-coded status indicators:
  - 🟢 Answered (Green)
  - 🔴 Not Answered (Red/Orange)
  - ⚪ Not Visited (Gray)
  - 🟣 Marked for Review (Purple)
  - 🟣✓ Answered & Marked (Purple with check)
- **Question Palette** — Click any number to jump directly to that question

### Additional Tools
- **Calculator Widget** — Floating calculator for basic arithmetic (+, -, ×, ÷)
- **Question Paper Modal** — View all questions and options in a scrollable list
- **Instructions Modal** — 10 exam instructions covering duration, navigation, color codes, and auto-submit rules
- **Submit Confirmation** — Summary of answered/not-answered/not-visited counts before final submission

---

## API Reference

### Base URL

```
http://localhost:5000
```

All responses follow a standardized format:

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

---

### POST `/api/ocr`

Upload JPEG images for text extraction.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `files` field containing one or more JPEG images

**Response (200):**
```json
{
  "success": true,
  "data": {
    "images_processed": 2,
    "ocr_results": [
      {
        "filename": "notes_page1.jpg",
        "text": "Extracted text from image 1...",
        "success": true,
        "error": null
      },
      {
        "filename": "notes_page2.jpg",
        "text": "Extracted text from image 2...",
        "success": true,
        "error": null
      }
    ],
    "combined_text": "Image 1:\nExtracted text from image 1...\n\nImage 2:\nExtracted text from image 2..."
  },
  "error": null
}
```

**Error Responses:**
- `400` — No valid files provided or no text extracted
- `413` — File too large (max 16MB per file)
- `500` — Server error during OCR processing

---

### POST `/api/generate-quiz`

Generate a quiz from extracted text using Google Gemini AI.

**Request:**
- Content-Type: `application/json`
- Body:
```json
{
  "ocr_text": "The extracted text from your study materials...",
  "num_questions": 10
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ocr_text` | string | Yes | Combined OCR text from `/api/ocr` |
| `num_questions` | integer | No | Number of questions (1-50, default: 10) |

**Response (200):**
```json
{
  "success": true,
  "data": {
    "ocr_text": "...",
    "quiz": {
      "quiz_title": "Biology Chapter 5 Quiz",
      "questions": [
        {
          "question": "What is the primary function of mitochondria?",
          "options": ["Protein synthesis", "ATP production", "DNA replication", "Cell division"],
          "correct_answer": "ATP production",
          "explanation": "Mitochondria are known as the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
          "difficulty": "easy"
        }
      ]
    }
  },
  "error": null
}
```

**Error Responses:**
- `400` — Missing or empty `ocr_text`
- `500` — Gemini API error or invalid response

---

## Customization

### Theme Tokens

The app uses Tailwind CSS v4 custom theme tokens defined in `frontend/src/index.css`:

```css
@theme {
  --color-primary-*: (indigo palette: 50-900)
  --color-success-*: (green palette)
  --color-warning-*: (amber palette)
  --color-danger-*: (red palette)
  --color-gray-*: (neutral palette: 50-900)
  --font-sans: Inter
}
```

### Exam Settings

Modify exam parameters in `frontend/src/data/examData.js`:

```js
transformQuizToExam(quiz, durationSeconds)  // Default: 3600 (60 min)
```

Change the countdown timer duration by modifying the `durationSeconds` parameter passed to `transformQuizToExam` in `ExamScreen.jsx`.

### Backend Configuration

| Setting | File | Default | Description |
|---------|------|---------|-------------|
| Max upload size | `app.py` | 16 MB | `MAX_CONTENT_LENGTH` |
| Allowed extensions | `utils/file_utils.py` | `.jpg`, `.jpeg` | `ALLOWED_EXTENSIONS` |
| OCR language | `services/ocr_service.py` | English | `["en"]` reader config |
| OCR GPU mode | `services/ocr_service.py` | Disabled | `gpu=False` |
| Gemini model | `services/gemini_service.py` | `gemini-3.6-flash` | Hardcoded model name |
| Gemini temperature | `services/gemini_service.py` | 0.7 | Generation temperature |
| CORS origin | `app.py` | `localhost:5173` | Allowed frontend origin |

---

## Troubleshooting

### EasyOCR Issues

**Problem:** First run is very slow / model download fails.
**Solution:** EasyOCR downloads ~100MB of model weights on first run. Ensure a stable internet connection. Models are cached after the first download.

**Problem:** `KMP_DUPLICATE_LIB_OK` warning.
**Solution:** This is handled automatically in `app.py`. The environment variable is set to suppress OpenMP/MKL duplicate library errors.

### Gemini API Issues

**Problem:** `Quiz generation failed: ...` error.
**Solution:** Ensure your `GEMINI_API_KEY` in `.env` is valid and has quota remaining. Check [Google AI Studio](https://ai.google.dev/) for usage limits.

**Problem:** Invalid JSON response from Gemini.
**Solution:** The service retries parsing. If it persists, try with shorter OCR text or fewer questions.

### CORS Errors

**Problem:** CORS policy blocks requests from frontend.
**Solution:** Ensure the backend is running on port 5000 and the Vite dev server is running on port 5173. The CORS origin is configured for `http://localhost:5173`.

### File Upload Issues

**Problem:** Upload fails silently.
**Solution:**
- Maximum file size is **16MB** per file
- Only **.jpg** and **.jpeg** extensions are supported
- Ensure images contain readable printed or handwritten text

### Port Conflicts

**Problem:** Port 5000 or 5173 already in use.
**Solution:**
- Kill the process using the port, or
- Change the port in `backend/app.py` (backend) and `frontend/vite.config.js` (frontend)

### EasyOCR Not Installing

**Problem:** `pip install -e ./EasyOCR` fails.
**Solution:** Ensure you're in the project root directory and the `EasyOCR` folder exists. Try installing build dependencies: `pip install setuptools wheel`.

---

## License

This project is licensed under the MIT License.

---

<p align="center">Built with React, Flask, EasyOCR, and Google Gemini</p>
