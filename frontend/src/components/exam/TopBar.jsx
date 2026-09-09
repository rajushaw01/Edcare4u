export default function TopBar({ subjectName, onOpenQuestionPaper, onOpenInstructions, onOpenUsefulData }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#1c1c1c] flex-shrink-0">
      <h1 className="text-sm font-bold text-white tracking-wide">
        {subjectName}
      </h1>
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenQuestionPaper}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-white hover:bg-white/10 transition-colors"
        >
          <span className="w-5 h-5 rounded-full bg-[#2fa84f] flex items-center justify-center text-[10px] font-bold text-white">
            Q
          </span>
          Question Paper
        </button>
        <button
          onClick={onOpenInstructions}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-white hover:bg-white/10 transition-colors"
        >
          <span className="w-5 h-5 rounded-full bg-[#2f7bc4] flex items-center justify-center text-[10px] font-bold text-white">
            i
          </span>
          Instructions
        </button>
        <button
          onClick={onOpenUsefulData}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-white hover:bg-white/10 transition-colors"
        >
          <span className="w-5 h-5 rounded-full bg-[#e8761d] flex items-center justify-center text-[10px] font-bold text-white">
            ?
          </span>
          Useful Data
        </button>
      </div>
    </div>
  );
}
