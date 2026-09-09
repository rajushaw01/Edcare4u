import { STATUS } from "../../hooks/useQuestionStatus";

const STATUS_COLORS = {
  [STATUS.NOT_VISITED]: "bg-[#c9c9c9] text-white",
  [STATUS.NOT_ANSWERED]: "bg-[#e8491d] text-white",
  [STATUS.ANSWERED]: "bg-[#2fa84f] text-white",
  [STATUS.MARKED_FOR_REVIEW]: "bg-[#7d3f98] text-white",
  [STATUS.ANSWERED_MARKED_FOR_REVIEW]: "bg-[#7d3f98] text-white",
};

export default function QuestionPalette({
  questions,
  questionStates,
  currentIndex,
  onSelectQuestion,
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-700 mb-2">
        Choose a Question
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {questions.map((q, i) => {
          const state = questionStates[q.id];
          const isCurrent = i === currentIndex;
          const colorClass = STATUS_COLORS[state?.status] || STATUS_COLORS[STATUS.NOT_VISITED];

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(i)}
              className={`relative w-full aspect-square rounded flex items-center justify-center text-xs font-bold transition-all ${colorClass} ${
                isCurrent ? "ring-2 ring-gray-900 ring-offset-1" : "hover:opacity-80"
              }`}
            >
              {isCurrent && (
                <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-gray-900" />
              )}
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
