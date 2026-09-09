import { useEffect, useState } from "react";

export default function ImagePreview({ images, onRemove }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Selected Images</h3>
        <span className="text-xs text-gray-500">{images.length} file{images.length !== 1 ? "s" : ""}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {images.map((img, index) => (
          <PreviewThumb key={`${img.name}-${index}`} img={img} index={index} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}

function PreviewThumb({ img, index, onRemove }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const url = URL.createObjectURL(img);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [img]);

  return (
    <div className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
      {src && (
        <img
          src={src}
          alt={img.name}
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200">
        <button
          className="absolute top-2 right-2 w-6 h-6 bg-white/90 hover:bg-danger-500 hover:text-white rounded-full flex items-center justify-center text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
          title="Remove image"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* File name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-4">
        <p className="text-[10px] text-white font-medium truncate" title={img.name}>
          {img.name}
        </p>
      </div>
    </div>
  );
}
