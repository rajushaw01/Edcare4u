export default function TimeUpModal({ onOk }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4">
          <svg className="w-7 h-7 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <h2 className="text-sm font-bold text-gray-900 mb-2">Time's Up!</h2>
        <p className="text-xs text-gray-500 mb-5">
          Your exam has been automatically submitted.
        </p>
        <button
          onClick={onOk}
          className="px-6 py-2 text-xs font-semibold text-white bg-[#2f7bc4] hover:bg-[#2568a8] rounded transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  );
}
