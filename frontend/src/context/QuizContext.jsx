import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext(null);

const initialState = {
  images: [],
  ocrText: "",
  quiz: null,
  answers: {},
  currentStep: "upload",
  loading: false,
  error: null,
  processingStage: "",
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_IMAGES":
      return { ...state, images: action.payload };
    case "SET_OCR_TEXT":
      return { ...state, ocrText: action.payload };
    case "SET_QUIZ":
      return { ...state, quiz: action.payload };
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.payload.questionIndex]: action.payload.answer },
      };
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_PROCESSING_STAGE":
      return { ...state, processingStage: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
