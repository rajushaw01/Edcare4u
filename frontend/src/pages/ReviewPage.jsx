import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ReviewPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const quiz = state.quiz;
  if (!quiz) return null;

  const total = quiz.questions.length;
  let correct = 0;
  quiz.questions.forEach((q, i) => {
    if (state.answers[i] === q.correct_answer) correct++;
  });

  const handleRetry = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-28">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 mb-4 shadow-lg shadow-primary-500/25">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Answer Review</h1>
            <p className="text-sm text-gray-500">
              You got <span className="font-semibold text-success-600">{correct}</span> out of <span className="font-semibold">{total}</span> correct
            </p>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {quiz.questions.map((q, i) => {
              const userAnswer = state.answers[i];
              const isCorrect = userAnswer === q.correct_answer;

              return (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                    isCorrect
                      ? "border-success-200 shadow-sm"
                      : "border-danger-200 shadow-sm"
                  }`}
                >
                  {/* Question Header */}
                  <div className={`px-6 py-4 flex items-center justify-between ${
                    isCorrect ? "bg-success-50" : "bg-danger-50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isCorrect
                          ? "bg-success-500 text-white"
                          : "bg-danger-500 text-white"
                      }`}>
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">Question {i + 1}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isCorrect
                        ? "bg-success-100 text-success-700"
                        : "bg-danger-100 text-danger-700"
                    }`}>
                      {isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="px-6 py-5">
                    <p className="text-base font-medium text-gray-900 mb-4 leading-relaxed">
                      {q.question}
                    </p>

                    {/* Answers */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-gray-500 mt-0.5 min-w-[90px]">Your Answer:</span>
                        <span className={`text-sm font-medium ${
                          isCorrect ? "text-success-600" : "text-danger-600"
                        }`}>
                          {userAnswer || "Not answered"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-semibold text-gray-500 mt-0.5 min-w-[90px]">Correct Answer:</span>
                          <span className="text-sm font-medium text-success-600">
                            {q.correct_answer}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Explanation</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleRetry}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-xl shadow-lg shadow-primary-500/25 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Take Quiz Again
            </button>
            <button
              onClick={() => navigate("/results")}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Results
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
