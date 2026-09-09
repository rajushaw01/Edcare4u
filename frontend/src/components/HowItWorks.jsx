const steps = [
  {
    number: "01",
    title: "Upload Your Notes",
    description: "Drag and drop your study materials - lecture notes, textbook pages, or handwritten notes. We support JPEG images.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
    ),
    color: "from-primary-500 to-primary-600",
    bgColor: "bg-primary-50",
    textColor: "text-primary-600",
  },
  {
    number: "02",
    title: "AI Analyzes Content",
    description: "Our advanced AI reads and understands your materials using OCR technology, extracting key concepts and topics.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" />
        <path d="M8.24 9.93A4 4 0 0 1 12 2" />
        <path d="M12 18v4" />
        <path d="M8 22h8" />
        <circle cx="12" cy="12" r="2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 4.93-1.41 1.41" />
      </svg>
    ),
    color: "from-warning-500 to-warning-600",
    bgColor: "bg-warning-50",
    textColor: "text-warning-600",
  },
  {
    number: "03",
    title: "Get Your Quiz",
    description: "Receive a personalized quiz with multiple-choice questions, difficulty levels, and detailed explanations for each answer.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    color: "from-success-500 to-success-600",
    bgColor: "bg-success-50",
    textColor: "text-success-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Go from study materials to interactive quiz in under a minute. It's as easy as 1-2-3.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] w-[calc(100%-20%)] h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 z-0" />
              )}

              <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
                {/* Step number */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-bold ${step.textColor} ${step.bgColor} px-2.5 py-1 rounded-full`}>
                    Step {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
