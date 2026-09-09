import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import ResultsCard from "../components/ResultsCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ResultsPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const quiz = state.quiz;
  if (!quiz) return null;

  const total = quiz.questions.length;
  let correct = 0;
  quiz.questions.forEach((q, i) => {
    if (state.answers[i] === q.correct_answer) correct++;
  });

  const percentage = Math.round((correct / total) * 100);

  let message = "";
  let emoji = "";
  if (percentage >= 90) {
    message = "Outstanding! You've mastered this material!";
    emoji = "Excellent";
  } else if (percentage >= 70) {
    message = "Great job! You have a solid understanding.";
    emoji = "Good";
  } else if (percentage >= 50) {
    message = "Good effort! Review the explanations to improve.";
    emoji = "Fair";
  } else {
    message = "Keep studying! Review the material and try again.";
    emoji = "Needs Work";
  }

  const handleRetry = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-24 sm:pt-28">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-success-400 to-success-500 mb-4 shadow-lg shadow-success-500/25">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
              <p className="text-sm text-gray-500">Here's how you did</p>
            </div>

            {/* Results */}
            <ResultsCard
              correct={correct}
              total={total}
              percentage={percentage}
              message={message}
              emoji={emoji}
            />

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                onClick={() => navigate("/review")}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 rounded-xl shadow-lg shadow-primary-500/25 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Review Answers
              </button>
              <button
                onClick={handleRetry}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                Take Again
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
