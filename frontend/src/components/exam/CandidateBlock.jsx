export default function CandidateBlock({ candidate }) {
  return (
    <div className="text-center">
      <div className="w-20 h-24 mx-auto mb-2 bg-gray-200 rounded border border-gray-300 flex items-center justify-center overflow-hidden">
        <svg
          className="w-10 h-10 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
      <div className="w-16 h-4 mx-auto mb-2 bg-gray-300 rounded" />
      <p className="text-xs font-semibold text-gray-800 truncate">
        {candidate.name}
      </p>
      <p className="text-[10px] text-gray-500 truncate">
        {candidate.applicantId}
      </p>
      <button className="mt-1.5 text-[10px] text-blue-600 hover:text-blue-800 font-medium">
        Profile
      </button>
    </div>
  );
}
