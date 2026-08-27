export default function QuizProgress({ current, total }) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="quiz-progress">
      <p className="quiz-progress-text">
        Question {current} of {total}
      </p>
      <div className="quiz-progress-bar-container">
        <div className="quiz-progress-bar" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
