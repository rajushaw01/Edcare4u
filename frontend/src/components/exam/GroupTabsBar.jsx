import { useRef, useState } from "react";
import CalculatorWidget from "./CalculatorWidget";

export default function GroupTabsBar({ groups, activeGroupIndex, onSelectGroup }) {
  const scrollRef = useRef(null);
  const [showCalculator, setShowCalculator] = useState(false);

  function scroll(dir) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 120, behavior: "smooth" });
    }
  }

  const stubActions = [
    { icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z", label: "Bookmark" },
    { icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7", label: "Edit" },
    { icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7", label: "Clear" },
    { icon: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z", label: "Webcam" },
  ];

  return (
    <>
      <div className="flex items-center px-2 py-1.5 bg-white border-b border-[#d9d9d9] flex-shrink-0">
        <button
          onClick={() => scroll(-1)}
          className="p-1 text-gray-500 hover:text-gray-700 flex-shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {groups.map((group, i) => (
            <button
              key={group.id}
              onClick={() => onSelectGroup(i)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all ${
                i === activeGroupIndex
                  ? "bg-[#2f7bc4] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {group.label}
              <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className="p-1 text-gray-500 hover:text-gray-700 flex-shrink-0"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-2">
          {stubActions.map((action) => (
            <button
              key={action.label}
              title={action.label}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={action.icon} />
              </svg>
            </button>
          ))}
          <button
            title="Calculator"
            onClick={() => setShowCalculator(!showCalculator)}
            className={`p-1.5 rounded transition-colors ${
              showCalculator ? "text-[#2f7bc4] bg-blue-50" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
              <line x1="8" y1="10" x2="10" y2="10" />
              <line x1="14" y1="10" x2="16" y2="10" />
              <line x1="8" y1="14" x2="10" y2="14" />
              <line x1="14" y1="14" x2="16" y2="14" />
              <line x1="8" y1="18" x2="16" y2="18" />
            </svg>
          </button>
        </div>
      </div>
      {showCalculator && <CalculatorWidget onClose={() => setShowCalculator(false)} />}
    </>
  );
}
