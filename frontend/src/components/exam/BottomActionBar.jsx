export default function BottomActionBar({
  onMarkForReview,
  onClearResponse,
  onSaveAndNext,
  onSubmit,
  isLastQuestion,
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-t border-[#d9d9d9] flex-shrink-0">
      <button
        onClick={onMarkForReview}
        className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-[#7d3f98] hover:bg-[#6a3482] rounded transition-colors"
      >
        Mark for Review & Next
      </button>
      <button
        onClick={onClearResponse}
        className="flex-1 px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded transition-colors"
      >
        Clear Response
      </button>
      {isLastQuestion ? (
        <button
          onClick={onSubmit}
          className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-[#2fa84f] hover:bg-[#268f42] rounded transition-colors"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={onSaveAndNext}
          className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-[#2fa84f] hover:bg-[#268f42] rounded transition-colors"
        >
          Save & Next
        </button>
      )}
    </div>
  );
}
