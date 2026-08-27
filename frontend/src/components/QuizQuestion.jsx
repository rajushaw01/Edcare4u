export default function QuizQuestion({ question, questionIndex, selectedAnswer, onSelect }) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="question-container">
      <p className="question-text">{question.question}</p>

      <div className="difficulty-badge">
        <span className={`difficulty difficulty-${question.difficulty}`}>
          {question.difficulty}
        </span>
      </div>

      <div className="options-list">
        {question.options.map((option, i) => (
          <button
            key={i}
            className={`option-btn ${selectedAnswer === option ? "option-selected" : ""}`}
            onClick={() => onSelect(option)}
          >
            <span className="option-label">{labels[i]}</span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
