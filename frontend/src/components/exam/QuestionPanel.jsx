const LABELS = ["A", "B", "C", "D"];

export default function QuestionPanel({
  question,
  questionNumber,
  selectedOption,
  onSelectOption,
}) {
  if (!question) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="border border-[#d9d9d9] rounded-lg bg-white">
        <div className="px-4 py-2.5 border-b border-[#d9d9d9] bg-gray-50">
          <span className="text-sm font-bold text-gray-900">
            Question No: {questionNumber}
          </span>
        </div>
        <div className="p-4 overflow-x-auto">
          <p className="text-sm text-gray-800 leading-relaxed mb-4">
            {question.text}
          </p>
          <div className="space-y-2">
            {question.options.map((option, i) => (
              <label
                key={option.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedOption === option.id
                    ? "border-[#2f7bc4] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    selectedOption === option.id
                      ? "border-[#2f7bc4]"
                      : "border-gray-400"
                  }`}
                >
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 rounded-full bg-[#2f7bc4]" />
                  )}
                </div>
                <span className="text-xs font-bold text-gray-500 w-5 flex-shrink-0">
                  {LABELS[i]}.
                </span>
                <span className="text-sm text-gray-700">{option.label}</span>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => onSelectOption(option.id)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
