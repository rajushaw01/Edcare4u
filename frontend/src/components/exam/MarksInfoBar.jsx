export default function MarksInfoBar({ marksCorrect, marksNegative }) {
  return (
    <div className="flex items-center justify-end px-4 py-1.5 bg-white border-b border-[#d9d9d9] flex-shrink-0">
      <span className="text-[11px] text-gray-600">
        Marks: +{marksCorrect} | Negative: {marksNegative}
      </span>
    </div>
  );
}
