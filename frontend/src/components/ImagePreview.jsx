import { useEffect, useState } from "react";

export default function ImagePreview({ images, onRemove }) {
  return (
    <div className="preview-section">
      <h3 className="preview-title">Selected Images</h3>
      <div className="preview-grid">
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
    <div className="preview-item">
      {src && <img src={src} alt={img.name} className="preview-img" />}
      <div className="preview-overlay">
        <button
          className="preview-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
          title="Remove image"
        >
          &times;
        </button>
      </div>
      <p className="preview-name" title={img.name}>{img.name}</p>
    </div>
  );
}
