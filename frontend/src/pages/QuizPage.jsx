import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import QuizQuestion from "../components/QuizQuestion";
import QuizProgress from "../components/QuizProgress";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function QuizPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const quiz = state.quiz;
  if (!quiz) return null;

  const questions = quiz.questions;
  const total = questions.length;
  const currentQuestion = questions[currentIndex];

  const handleSelect = (option) => {
    dispatch({
      type: "SET_ANSWER",
      payload: { questionIndex: currentIndex, answer: option },
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/results");
    }
  };

  const isLast = currentIndex === total - 1;
  const selectedAnswer = state.answers[currentIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-28">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full mb-3">
                <svg className="w-4 h-4 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span className="text-xs font-semibold text-primary-700">Quiz Mode</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{quiz.quiz_title}</h1>
            </div>

            {/* Progress */}
            <QuizProgress current={currentIndex + 1} total={total} />

            {/* Question */}
            <QuizQuestion
              question={currentQuestion}
              questionIndex={currentIndex}
              selectedAnswer={selectedAnswer}
              onSelect={handleSelect}
            />

            {/* Navigation */}
            <div className="grid grid-cols-3 items-center gap-4 mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-start">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-100"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Previous
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-200 ${
                      i === currentIndex
                        ? "bg-primary-500 w-6"
                        : state.answers[i]
                        ? "bg-success-400 w-2.5"
                        : "bg-gray-200 hover:bg-gray-300 w-2.5"
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
                >
                  {isLast ? "Finish" : "Next"}
                  {!isLast && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                  {isLast && (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
