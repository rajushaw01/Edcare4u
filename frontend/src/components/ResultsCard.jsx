export default function ResultsCard({ correct, total, percentage, message, emoji }) {
  return (
    <div className="text-center">
      {/* Score Circle */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - percentage / 100)}`}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
          <span className="text-xs font-medium text-gray-500 mt-0.5">{emoji}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-8 mb-6">
        <div className="text-center">
          <span className="block text-2xl font-bold text-success-500">{correct}</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Correct</span>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div className="text-center">
          <span className="block text-2xl font-bold text-danger-500">{total - correct}</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Incorrect</span>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div className="text-center">
          <span className="block text-2xl font-bold text-gray-900">{total}</span>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</span>
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-600 leading-relaxed px-4">{message}</p>
    </div>
  );
}
