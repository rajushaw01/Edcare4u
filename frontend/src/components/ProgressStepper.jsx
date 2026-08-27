export default function ProgressStepper({ stages, currentStage }) {
  const currentIndex = stages.findIndex((s) => s.key === currentStage);

  return (
    <div className="stepper">
      {stages.map((stage, i) => {
        let status = "pending";
        if (i < currentIndex) status = "done";
        else if (i === currentIndex) status = "active";

        return (
          <div key={stage.key} className={`stepper-item stepper-${status}`}>
            <div className="stepper-icon">
              {status === "done" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : status === "active" ? (
                <div className="stepper-spinner" />
              ) : (
                <span className="stepper-dot" />
              )}
            </div>
            <span className="stepper-label">{stage.label}</span>
          </div>
        );
      })}
    </div>
  );
}
