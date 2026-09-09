import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import ImageUploader from "../components/ImageUploader";
import ImagePreview from "../components/ImagePreview";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UploadPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (newFiles) => {
      const validFiles = Array.from(newFiles).filter((f) => {
        const ext = f.name.split(".").pop().toLowerCase();
        return ext === "jpg" || ext === "jpeg";
      });

      if (validFiles.length !== newFiles.length) {
        alert("Only .jpg and .jpeg files are supported.");
      }

      dispatch({ type: "SET_IMAGES", payload: [...state.images, ...validFiles] });
    },
    [state.images, dispatch]
  );

  const removeImage = useCallback(
    (index) => {
      const updated = state.images.filter((_, i) => i !== index);
      dispatch({ type: "SET_IMAGES", payload: updated });
    },
    [state.images, dispatch]
  );

  const handleGenerate = () => {
    if (state.images.length === 0) return;
    navigate("/processing");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />

      {/* Upload Section */}
      <section id="upload" className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Upload Your Study Materials
            </h2>
            <p className="text-lg text-gray-600">
              Drag and drop your lecture notes or textbook pages to create a quiz instantly.
            </p>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8">
            <ImageUploader
              onFiles={handleFiles}
              dragActive={dragActive}
              setDragActive={setDragActive}
            />

            {state.images.length > 0 && (
              <ImagePreview
                images={state.images}
                onRemove={removeImage}
              />
            )}

            {state.images.length > 0 && (
              <div className="mt-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full">
                    <svg className="w-5 h-5 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-sm font-medium text-primary-700">
                      {state.images.length} image{state.images.length !== 1 ? "s" : ""} selected
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-2xl shadow-xl shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Generate Quiz
                </button>
              </div>
            )}
          </div>

          {/* Supported formats */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Supported formats: JPEG (.jpg, .jpeg) &bull; Max recommended: 20 images
          </p>
        </div>
      </section>

      <HowItWorks />
      <Features />
      <Footer />
    </div>
  );
}
