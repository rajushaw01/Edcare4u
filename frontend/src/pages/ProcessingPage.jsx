import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuiz } from "../context/QuizContext";
import ProgressStepper from "../components/ProgressStepper";

const STAGES = [
  { key: "upload", label: "Uploading images" },
  { key: "ocr", label: "Running EasyOCR" },
  { key: "combine", label: "Combining extracted text" },
  { key: "gemini", label: "Sending content to Gemini" },
  { key: "generate", label: "Generating quiz" },
  { key: "ready", label: "Preparing results" },
];

export default function ProcessingPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    if (!state.images || state.images.length === 0) {
      navigate("/");
      return;
    }
    processedRef.current = true;
    runPipeline();
  }, []);

  async function runPipeline() {
    try {
      // Stage 1: Upload + OCR
      dispatch({ type: "SET_PROCESSING_STAGE", payload: "upload" });
      await delay(400);

      dispatch({ type: "SET_PROCESSING_STAGE", payload: "ocr" });
      const formData = new FormData();
      state.images.forEach((img) => formData.append("files", img));

      const ocrResponse = await axios.post("/api/ocr", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 300000,
      });

      if (!ocrResponse.data.success) {
        throw new Error(ocrResponse.data.error?.message || "OCR processing failed");
      }

      // Stage 3: Combine text
      dispatch({ type: "SET_PROCESSING_STAGE", payload: "combine" });
      dispatch({ type: "SET_OCR_TEXT", payload: ocrResponse.data.data.combined_text });
      await delay(300);

      // Stage 4-5: Gemini quiz generation
      dispatch({ type: "SET_PROCESSING_STAGE", payload: "gemini" });
      await delay(500);

      dispatch({ type: "SET_PROCESSING_STAGE", payload: "generate" });
      const quizResponse = await axios.post(
        "/api/generate-quiz",
        { ocr_text: ocrResponse.data.data.combined_text },
        { timeout: 120000 }
      );

      if (!quizResponse.data.success) {
        throw new Error(quizResponse.data.error?.message || "Quiz generation failed");
      }

      // Stage 6: Ready
      dispatch({ type: "SET_PROCESSING_STAGE", payload: "ready" });
      dispatch({ type: "SET_QUIZ", payload: quizResponse.data.data.quiz });
      await delay(600);

      navigate("/quiz");
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.message ||
        "An unexpected error occurred";
      dispatch({ type: "SET_ERROR", payload: message });
    }
  }

  const currentStageIndex = STAGES.findIndex((s) => s.key === state.processingStage);
  const progress = Math.round(((currentStageIndex + 1) / STAGES.length) * 100);

  return (
    <div className="page">
      <div className="glass-card processing-card">
        <h1 className="processing-title">Generating Your Quiz</h1>

        {state.error ? (
          <div className="error-container">
            <div className="error-icon">!</div>
            <p className="error-message">{state.error}</p>
            <div className="error-actions">
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Try Again
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/")}>
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <ProgressStepper stages={STAGES} currentStage={state.processingStage} />
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="progress-text">{progress}% complete</p>
          </>
        )}
      </div>
    </div>
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
