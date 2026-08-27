import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import QuizQuestion from "../components/QuizQuestion";
import QuizProgress from "../components/QuizProgress";

export default function QuizPage() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const quiz = state.quiz;
  if (!quiz) return null;

  const questions = quiz.questions;
  const total = questions.length;
  const currentQuestion = questions[currentIndex];

  const handleSelect = (option) => {
    dispatch({
      type: "SET_ANSWER",
      payload: { questionIndex: currentIndex, answer: option },
    });
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/results");
    }
  };

  const isLast = currentIndex === total - 1;
  const selectedAnswer = state.answers[currentIndex];

  return (
    <div className="page">
      <div className="glass-card quiz-card">
        <h1 className="quiz-title">{quiz.quiz_title}</h1>

        <QuizProgress current={currentIndex + 1} total={total} />

        <QuizQuestion
          question={currentQuestion}
          questionIndex={currentIndex}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
        />

        <div className="quiz-nav">
          <button
            className="btn btn-secondary"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            {isLast ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
