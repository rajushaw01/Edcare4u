import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuiz } from "../context/QuizContext";
import ProgressStepper from "../components/ProgressStepper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

      dispatch({ type: "SET_PROCESSING_STAGE", payload: "combine" });
      dispatch({ type: "SET_OCR_TEXT", payload: ocrResponse.data.data.combined_text });
      await delay(300);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-28">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-4 shadow-lg shadow-primary-500/25">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" />
                  <path d="M8.24 9.93A4 4 0 0 1 12 2" />
                  <path d="M12 18v4" />
                  <path d="M8 22h8" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Generating Your Quiz</h1>
              <p className="text-sm text-gray-500">This usually takes 15-30 seconds</p>
            </div>

            {state.error ? (
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-danger-50 mb-4">
                  <svg className="w-7 h-7 text-danger-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
                <p className="text-sm text-gray-600 mb-6 px-4">{state.error}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-xl shadow-lg shadow-primary-500/25 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 4 23 10 17 10" />
                      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                    </svg>
                    Try Again
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <ProgressStepper stages={STAGES} currentStage={state.processingStage} />

                {/* Progress Bar */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-primary-600">{progress}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
