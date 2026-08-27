export default function ResultsCard({ correct, total, percentage, message }) {
  let emoji = "";
  if (percentage >= 90) emoji = "Excellent";
  else if (percentage >= 70) emoji = "Good";
  else if (percentage >= 50) emoji = "Fair";
  else emoji = "Needs Work";

  return (
    <div className="results-content">
      <div className="score-circle">
        <svg viewBox="0 0 120 120" className="score-svg">
          <circle cx="60" cy="60" r="54" className="score-bg" />
          <circle
            cx="60"
            cy="60"
            r="54"
            className="score-fill"
            style={{
              strokeDasharray: `${2 * Math.PI * 54}`,
              strokeDashoffset: `${2 * Math.PI * 54 * (1 - percentage / 100)}`,
            }}
          />
        </svg>
        <div className="score-text">
          <span className="score-number">{percentage}%</span>
        </div>
      </div>

      <div className="score-details">
        <div className="score-row">
          <span className="score-label">Correct</span>
          <span className="score-value score-correct">{correct}</span>
        </div>
        <div className="score-row">
          <span className="score-label">Incorrect</span>
          <span className="score-value score-incorrect">{total - correct}</span>
        </div>
        <div className="score-row">
          <span className="score-label">Total</span>
          <span className="score-value">{total}</span>
        </div>
      </div>

      <p className="results-message">{message}</p>
    </div>
  );
}
