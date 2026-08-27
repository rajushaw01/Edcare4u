import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import ResultsCard from "../components/ResultsCard";

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
  if (percentage >= 90) message = "Outstanding! You've mastered this material!";
  else if (percentage >= 70) message = "Great job! You have a solid understanding.";
  else if (percentage >= 50) message = "Good effort! Review the explanations to improve.";
  else message = "Keep studying! Review the material and try again.";

  const handleRetry = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="page">
      <div className="glass-card results-card">
        <h1 className="results-title">Quiz Completed!</h1>
        <ResultsCard
          correct={correct}
          total={total}
          percentage={percentage}
          message={message}
        />
        <div className="results-actions">
          <button className="btn btn-primary" onClick={() => navigate("/review")}>
            Review Answers
          </button>
          <button className="btn btn-secondary" onClick={handleRetry}>
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
}
