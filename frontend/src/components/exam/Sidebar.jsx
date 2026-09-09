import CandidateBlock from "./CandidateBlock";
import LegendGrid from "./LegendGrid";
import QuestionPalette from "./QuestionPalette";

export default function Sidebar({
  candidate,
  counts,
  questions,
  questionStates,
  currentIndex,
  onSelectQuestion,
  activeSectionLabel,
  collapsed,
  onToggle,
  isMobile,
}) {
  if (isMobile && collapsed) return null;

  const content = (
    <div className="h-full flex flex-col bg-[#eaf3fb] overflow-hidden">
      <div className="p-3 border-b border-gray-200">
        <CandidateBlock candidate={candidate} />
      </div>
      <div className="p-3 border-b border-gray-200">
        <LegendGrid counts={counts} />
      </div>
      <div className="px-3 py-2">
        <div className="w-full h-1.5 bg-[#2f7bc4] rounded-full mb-2" />
        <p className="text-[10px] text-gray-500 font-medium">{activeSectionLabel}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <QuestionPalette
          questions={questions}
          questionStates={questionStates}
          currentIndex={currentIndex}
          onSelectQuestion={onSelectQuestion}
        />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onToggle}>
        <div
          className="absolute right-0 top-0 bottom-0 w-72 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={onToggle}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-12 bg-gray-200 hover:bg-gray-300 rounded-l-md flex items-center justify-center transition-colors"
      >
        <svg
          className={`w-3 h-3 text-gray-600 transition-transform ${collapsed ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          collapsed ? "w-0" : "w-64"
        }`}
      >
        <div className="w-64 h-full">{content}</div>
      </div>
    </div>
  );
}
