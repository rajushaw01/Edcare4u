import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import ImageUploader from "../components/ImageUploader";
import ImagePreview from "../components/ImagePreview";

export default function UploadPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (newFiles) => {
      const validFiles = Array.from(newFiles).filter((f) => {
        const ext = f.name.split(".").pop().toLowerCase();
        return ext === "jpg" || ext === "jpeg";
      });

      if (validFiles.length !== newFiles.length) {
        alert("Only .jpg and .jpeg files are supported.");
      }

      dispatch({ type: "SET_IMAGES", payload: [...state.images, ...validFiles] });
    },
    [state.images, dispatch]
  );

  const removeImage = useCallback(
    (index) => {
      const updated = state.images.filter((_, i) => i !== index);
      dispatch({ type: "SET_IMAGES", payload: updated });
    },
    [state.images, dispatch]
  );

  const handleGenerate = () => {
    if (state.images.length === 0) return;
    navigate("/processing");
  };

  return (
    <div className="page">
      <div className="glass-card upload-card">
        <div className="upload-header">
          <h1 className="app-title">Edcare4u</h1>
          <p className="app-subtitle">
            Upload your study material images and let AI generate an interactive quiz for you
          </p>
        </div>

        <ImageUploader
          onFiles={handleFiles}
          dragActive={dragActive}
          setDragActive={setDragActive}
        />

        {state.images.length > 0 && (
          <ImagePreview
            images={state.images}
            onRemove={removeImage}
          />
        )}

        {state.images.length > 0 && (
          <div className="upload-footer">
            <p className="image-count">{state.images.length} image{state.images.length !== 1 ? "s" : ""} selected</p>
            <button className="btn btn-primary" onClick={handleGenerate}>
              Generate Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
