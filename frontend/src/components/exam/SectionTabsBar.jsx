import { useRef } from "react";

export default function SectionTabsBar({ sections, activeSectionIndex, onSelectSection }) {
  const scrollRef = useRef(null);

  function scroll(dir) {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 120, behavior: "smooth" });
    }
  }

  return (
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
        className="flex-1 flex items-center gap-1 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {sections.map((section, i) => (
          <button
            key={section.id}
            onClick={() => onSelectSection(i)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all ${
              i === activeSectionIndex
                ? "bg-[#2f7bc4] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {section.label}
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
    </div>
  );
}
