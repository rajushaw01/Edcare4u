import { STATUS } from "../../hooks/useQuestionStatus";

export default function SubmitConfirmModal({ counts, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-900">Submit Exam</h2>
          <p className="text-xs text-gray-500 mt-1">
            Are you sure you want to submit? Review your answers below.
          </p>
        </div>
        <div className="px-5 py-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#2fa84f]" />
              Answered
            </span>
            <span className="font-semibold">{counts.answered}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#e8491d]" />
              Not Answered
            </span>
            <span className="font-semibold">{counts.notAnswered}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#c9c9c9]" />
              Not Visited
            </span>
            <span className="font-semibold">{counts.notVisited}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#7d3f98]" />
              Marked for Review
            </span>
            <span className="font-semibold">{counts.markedForReview}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#7d3f98] flex items-center justify-center">
                <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Ans & Marked for Review
            </span>
            <span className="font-semibold">{counts.answeredMarkedForReview}</span>
          </div>
        </div>
        <div className="px-5 py-3 border-t border-gray-200 flex items-center gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2fa84f] hover:bg-[#268f42] rounded transition-colors"
          >
            Confirm Submit
          </button>
        </div>
      </div>
    </div>
  );
}
