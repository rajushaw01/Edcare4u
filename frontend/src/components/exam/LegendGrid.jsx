import { STATUS } from "../../hooks/useQuestionStatus";

const LEGEND_ITEMS = [
  { status: STATUS.ANSWERED, color: "bg-[#2fa84f]", label: "Answered" },
  { status: STATUS.NOT_ANSWERED, color: "bg-[#e8491d]", label: "Not Answered" },
  { status: STATUS.NOT_VISITED, color: "bg-[#c9c9c9]", label: "Not Visited" },
  { status: STATUS.MARKED_FOR_REVIEW, color: "bg-[#7d3f98]", label: "Marked for Review" },
  { status: STATUS.ANSWERED_MARKED_FOR_REVIEW, color: "bg-[#7d3f98]", label: "Ans & Marked for Review", hasCheck: true },
];

export default function LegendGrid({ counts }) {
  const countMap = {
    [STATUS.ANSWERED]: counts.answered,
    [STATUS.NOT_ANSWERED]: counts.notAnswered,
    [STATUS.NOT_VISITED]: counts.notVisited,
    [STATUS.MARKED_FOR_REVIEW]: counts.markedForReview,
    [STATUS.ANSWERED_MARKED_FOR_REVIEW]: counts.answeredMarkedForReview,
  };

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.status} className="flex items-center gap-1.5">
          <div className={`w-4 h-4 rounded-sm flex-shrink-0 flex items-center justify-center ${item.color}`}>
            {item.hasCheck && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span className="text-[10px] text-gray-700 leading-tight">
            {countMap[item.status]} {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
