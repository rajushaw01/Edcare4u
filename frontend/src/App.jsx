import { Routes, Route, Navigate } from "react-router-dom";
import { useQuiz } from "./context/QuizContext";
import UploadPage from "./pages/UploadPage";
import ProcessingPage from "./pages/ProcessingPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import ReviewPage from "./pages/ReviewPage";

function App() {
  const { state } = useQuiz();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/processing" element={<ProcessingPage />} />
        <Route
          path="/quiz"
          element={
            state.quiz ? (
              <QuizPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/results"
          element={
            state.quiz ? (
              <ResultsPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/review"
          element={
            state.quiz ? (
              <ReviewPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
