import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function ReviewPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const quiz = state.quiz;
  if (!quiz) return null;

  const handleRetry = () => {
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="page">
      <div className="glass-card review-card">
        <h1 className="review-title">Answer Review</h1>

        <div className="review-list">
          {quiz.questions.map((q, i) => {
            const userAnswer = state.answers[i];
            const isCorrect = userAnswer === q.correct_answer;

            return (
              <div key={i} className={`review-item ${isCorrect ? "correct" : "incorrect"}`}>
                <div className="review-header">
                  <span className="review-number">Question {i + 1}</span>
                  <span className={`review-badge ${isCorrect ? "badge-correct" : "badge-incorrect"}`}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <p className="review-question">{q.question}</p>

                <div className="review-answers">
                  <div className="review-answer-block">
                    <span className="review-label">Your Answer:</span>
                    <span className={`review-answer ${isCorrect ? "answer-correct" : "answer-wrong"}`}>
                      {userAnswer || "Not answered"}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="review-answer-block">
                      <span className="review-label">Correct Answer:</span>
                      <span className="review-answer answer-correct">{q.correct_answer}</span>
                    </div>
                  )}
                </div>

                <div className="review-explanation">
                  <span className="review-label">Explanation:</span>
                  <p>{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="review-actions">
          <button className="btn btn-primary" onClick={handleRetry}>
            Take Quiz Again
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/results")}>
            Back to Results
          </button>
        </div>
      </div>
    </div>
  );
}
