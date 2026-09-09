export default function ProgressStepper({ stages, currentStage }) {
  const currentIndex = stages.findIndex((s) => s.key === currentStage);

  return (
    <div className="space-y-2">
      {stages.map((stage, i) => {
        let status = "pending";
        if (i < currentIndex) status = "done";
        else if (i === currentIndex) status = "active";

        return (
          <div
            key={stage.key}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              status === "done"
                ? "bg-success-50"
                : status === "active"
                ? "bg-primary-50"
                : "bg-gray-50"
            }`}
          >
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                status === "done"
                  ? "bg-success-500 text-white"
                  : status === "active"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {status === "done" ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : status === "active" ? (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="w-2 h-2 bg-gray-400 rounded-full" />
              )}
            </div>

            {/* Label */}
            <span
              className={`text-sm font-medium ${
                status === "done"
                  ? "text-success-700"
                  : status === "active"
                  ? "text-primary-700 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {stage.label}
            </span>

            {/* Status indicator */}
            {status === "done" && (
              <span className="ml-auto text-xs font-medium text-success-600 bg-success-100 px-2 py-0.5 rounded-full">
                Done
              </span>
            )}
            {status === "active" && (
              <span className="ml-auto text-xs font-medium text-primary-600 bg-primary-100 px-2 py-0.5 rounded-full">
                Processing...
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
