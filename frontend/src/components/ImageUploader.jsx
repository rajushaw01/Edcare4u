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
      className={`drop-zone ${dragActive ? "drop-zone-active" : ""}`}
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
        style={{ display: "none" }}
      />
      <div className="drop-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <p className="drop-text">
        {dragActive ? "Drop your images here" : "Drag & drop JPEG images here"}
      </p>
      <p className="drop-subtext">or</p>
      <button
        type="button"
        className="btn btn-secondary btn-browse"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        Browse Files
      </button>
      <p className="drop-hint">Supports .jpg and .jpeg files</p>
    </div>
  );
}
