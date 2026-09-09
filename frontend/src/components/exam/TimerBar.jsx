export default function TimerBar({ sectionLabel, formattedTime, timeLeft }) {
  const isWarning = timeLeft <= 300;

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-[#d9d9d9] flex-shrink-0">
      <span className="text-xs font-medium text-gray-600">{sectionLabel}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">Time Left:</span>
        <span
          className={`text-sm font-bold ${
            isWarning ? "text-red-600" : "text-gray-900"
          }`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
}
