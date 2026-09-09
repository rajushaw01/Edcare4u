const features = [
  {
    title: "AI-Powered Analysis",
    description: "Our advanced AI reads and comprehends your study materials, extracting key concepts and important information automatically.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" />
        <path d="M8.24 9.93A4 4 0 0 1 12 2" />
        <path d="M12 18v4" />
        <path d="M8 22h8" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    color: "bg-primary-500",
    lightColor: "bg-primary-50",
    textColor: "text-primary-600",
  },
  {
    title: "Instant Quiz Generation",
    description: "Get a complete quiz with multiple-choice questions, difficulty levels, and correct answers in seconds, not hours.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    color: "bg-warning-500",
    lightColor: "bg-warning-50",
    textColor: "text-warning-600",
  },
  {
    title: "Detailed Explanations",
    description: "Every question comes with a clear explanation, helping you understand why an answer is correct and learn from mistakes.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    color: "bg-success-500",
    lightColor: "bg-success-50",
    textColor: "text-success-600",
  },
  {
    title: "Track Your Progress",
    description: "See your scores, review correct and incorrect answers, and identify areas where you need more practice.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    color: "bg-danger-500",
    lightColor: "bg-danger-50",
    textColor: "text-danger-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Why Edcare4u
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Study Smarter
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with cutting-edge AI technology to help you learn more effectively and ace your exams.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${feature.lightColor} ${feature.textColor} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-gray-50 rounded-2xl px-8 py-6 border border-gray-100">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                S
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning-400 to-warning-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success-400 to-success-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-900">Join 1000+ students</p>
              <p className="text-xs text-gray-500">already learning with Edcare4u</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
