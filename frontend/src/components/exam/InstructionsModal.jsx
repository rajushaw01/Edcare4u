export default function InstructionsModal({ onClose }) {
  const instructions = [
    "The total duration of the exam is indicated at the top of the screen.",
    "Each question has exactly 4 options. Select one option per question.",
    "You can navigate between questions using the question palette on the right.",
    "Questions not visited appear in gray. Questions visited but unanswered appear in red/orange.",
    "Answered questions appear in green. Questions marked for review appear in purple.",
    "Use 'Mark for Review & Next' to flag a question for later review.",
    "Use 'Clear Response' to deselect your answer for the current question.",
    "Use 'Save & Next' to save your answer and move to the next question.",
    "The test will auto-submit when the timer reaches 0:00.",
    "Click 'Submit' when you have completed the exam to see your summary.",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
          <h2 className="text-sm font-bold text-gray-900">Instructions</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <ol className="space-y-2.5 list-decimal list-inside text-xs text-gray-700 leading-relaxed">
            {instructions.map((inst, i) => (
              <li key={i}>{inst}</li>
            ))}
          </ol>
        </div>
        <div className="px-5 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#2f7bc4] hover:bg-[#2568a8] rounded transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
