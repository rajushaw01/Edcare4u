import { useRef } from "react";

export default function ImageUploader({ onFiles, dragActive, setDragActive }) {
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    if (e.target.files?.length) onFiles(e.target.files);
    e.target.value = "";
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
        dragActive
          ? "border-primary-500 bg-primary-50/50 scale-[1.02] shadow-lg shadow-primary-500/10"
          : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg"
        multiple
        onChange={handleChange}
        className="hidden"
      />

      {/* Upload Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-300 ${
        dragActive
          ? "bg-primary-100 text-primary-600 scale-110"
          : "bg-gray-100 text-gray-400"
      }`}>
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      {/* Text */}
      <h3 className={`text-lg font-semibold mb-2 transition-colors ${
        dragActive ? "text-primary-600" : "text-gray-700"
      }`}>
        {dragActive ? "Drop your images here" : "Drag & drop your images here"}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        or click to browse files
      </p>

      {/* Browse Button */}
      <button
        type="button"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        Browse Files
      </button>

      {/* Hint */}
      <p className="text-xs text-gray-400 mt-4">
        Supports .jpg and .jpeg files
      </p>
    </div>
  );
}
