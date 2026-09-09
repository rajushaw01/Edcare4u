export default function QuizQuestion({ question, questionIndex, selectedAnswer, onSelect }) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div>
      {/* Question */}
      <div className="mb-4">
        <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Difficulty Badge */}
      <div className="mb-6">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
            question.difficulty === "easy"
              ? "bg-success-50 text-success-600"
              : question.difficulty === "medium"
              ? "bg-warning-50 text-warning-600"
              : "bg-danger-50 text-danger-600"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${
            question.difficulty === "easy"
              ? "bg-success-500"
              : question.difficulty === "medium"
              ? "bg-warning-500"
              : "bg-danger-500"
          }`} />
          {question.difficulty}
        </span>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onSelect(option)}
            className={`w-full flex items-center gap-4 p-4 text-left rounded-xl border-2 transition-all duration-200 ${
              selectedAnswer === option
                ? "border-primary-500 bg-primary-50 shadow-sm"
                : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
            }`}
          >
            {/* Option Label */}
            <span
              className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                selectedAnswer === option
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {labels[i]}
            </span>

            {/* Option Text */}
            <span className={`flex-1 text-sm sm:text-base font-medium ${
              selectedAnswer === option ? "text-primary-700" : "text-gray-700"
            }`}>
              {option}
            </span>

            {/* Check mark */}
            {selectedAnswer === option && (
              <svg className="w-5 h-5 text-primary-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
