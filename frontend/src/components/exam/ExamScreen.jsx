import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext";
import { transformQuizToExam, getSubjectName } from "../../data/examData";
import { useCountdown } from "../../hooks/useCountdown";
import { useQuestionStatus } from "../../hooks/useQuestionStatus";
import TopBar from "./TopBar";
import GroupTabsBar from "./GroupTabsBar";
import TimerBar from "./TimerBar";
import SectionTabsBar from "./SectionTabsBar";
import MarksInfoBar from "./MarksInfoBar";
import QuestionPanel from "./QuestionPanel";
import BottomActionBar from "./BottomActionBar";
import Sidebar from "./Sidebar";
import QuestionPaperModal from "./QuestionPaperModal";
import InstructionsModal from "./InstructionsModal";
import UsefulDataModal from "./UsefulDataModal";
import SubmitConfirmModal from "./SubmitConfirmModal";
import TimeUpModal from "./TimeUpModal";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

export default function ExamScreen() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const exam = transformQuizToExam(state.quiz);
  const subjectName = getSubjectName(state.quiz);

  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [showQuestionPaper, setShowQuestionPaper] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showUsefulData, setShowUsefulData] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showTimeUp, setShowTimeUp] = useState(false);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const activeGroup = exam.groups[activeGroupIndex];
  const activeSection = activeGroup.sections[activeSectionIndex];
  const questions = activeSection.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const { timeLeft, formatted, isTimeUp } = useCountdown(exam.durationSeconds);

  const {
    questionStates,
    goToQuestion,
    selectOption,
    markForReview,
    clearResponse,
    counts,
  } = useQuestionStatus(questions);

  const handleSubmit = useCallback(() => {
    setShowSubmitConfirm(false);
    navigate("/results");
  }, [navigate]);

  useEffect(() => {
    if (isTimeUp && !showTimeUp) {
      setShowTimeUp(true);
    }
  }, [isTimeUp, showTimeUp]);

  useEffect(() => {
    goToQuestion(questions[currentQuestionIndex]?.id);
  }, [currentQuestionIndex, questions, goToQuestion]);

  function handleSelectQuestion(index) {
    setCurrentQuestionIndex(index);
    goToQuestion(questions[index]?.id);
    setMobileSidebarOpen(false);
  }

  function handleSelectOption(optionId) {
    selectOption(currentQuestion.id, optionId);
    const option = currentQuestion.options.find((o) => o.id === optionId);
    dispatch({
      type: "SET_ANSWER",
      payload: { questionIndex: currentQuestionIndex, answer: option?.label || null },
    });
  }

  function handleSaveAndNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  function handleMarkForReview() {
    if (currentQuestion) {
      markForReview(currentQuestion.id);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  function handleClearResponse() {
    if (currentQuestion) {
      clearResponse(currentQuestion.id);
      dispatch({ type: "SET_ANSWER", payload: { questionIndex: currentQuestionIndex, answer: null } });
    }
  }

  const isLastQuestion =
    activeGroupIndex === exam.groups.length - 1 &&
    activeSectionIndex === activeGroup.sections.length - 1 &&
    currentQuestionIndex === questions.length - 1;

  const currentState = currentQuestion
    ? questionStates[currentQuestion.id]
    : null;

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <TopBar
        subjectName={subjectName}
        onOpenQuestionPaper={() => setShowQuestionPaper(true)}
        onOpenInstructions={() => setShowInstructions(true)}
        onOpenUsefulData={() => setShowUsefulData(true)}
      />

      <GroupTabsBar
        groups={exam.groups}
        activeGroupIndex={activeGroupIndex}
        onSelectGroup={(i) => {
          setActiveGroupIndex(i);
          setActiveSectionIndex(0);
          setCurrentQuestionIndex(0);
        }}
      />

      <TimerBar
        sectionLabel={activeSection.label}
        formattedTime={formatted}
        timeLeft={timeLeft}
      />

      <SectionTabsBar
        sections={activeGroup.sections}
        activeSectionIndex={activeSectionIndex}
        onSelectSection={(i) => {
          setActiveSectionIndex(i);
          setCurrentQuestionIndex(0);
        }}
      />

      <MarksInfoBar
        marksCorrect={activeSection.marksCorrect}
        marksNegative={activeSection.marksNegative}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <QuestionPanel
            question={currentQuestion}
            questionNumber={currentQuestionIndex + 1}
            selectedOption={currentState?.selectedOption}
            onSelectOption={handleSelectOption}
          />
          <BottomActionBar
            onMarkForReview={handleMarkForReview}
            onClearResponse={handleClearResponse}
            onSaveAndNext={handleSaveAndNext}
            onSubmit={() => setShowSubmitConfirm(true)}
            isLastQuestion={isLastQuestion}
          />
        </div>

        {isMobile ? (
          <>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="fixed bottom-20 right-4 z-30 w-14 h-14 rounded-full bg-[#2f7bc4] text-white shadow-lg flex flex-col items-center justify-center text-[10px] font-bold"
            >
              <span>{counts.answered}/{counts.total}</span>
              <span className="text-[8px] font-normal opacity-80">Palette</span>
            </button>
            {mobileSidebarOpen && (
              <Sidebar
                candidate={exam.candidate}
                counts={counts}
                questions={questions}
                questionStates={questionStates}
                currentIndex={currentQuestionIndex}
                onSelectQuestion={handleSelectQuestion}
                activeSectionLabel={activeSection.label}
                collapsed={false}
                onToggle={() => setMobileSidebarOpen(false)}
                isMobile={true}
              />
            )}
          </>
        ) : (
          <Sidebar
            candidate={exam.candidate}
            counts={counts}
            questions={questions}
            questionStates={questionStates}
            currentIndex={currentQuestionIndex}
            onSelectQuestion={handleSelectQuestion}
            activeSectionLabel={activeSection.label}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            isMobile={false}
          />
        )}
      </div>

      {showQuestionPaper && (
        <QuestionPaperModal
          questions={questions}
          onClose={() => setShowQuestionPaper(false)}
        />
      )}
      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
      {showUsefulData && (
        <UsefulDataModal onClose={() => setShowUsefulData(false)} />
      )}
      {showSubmitConfirm && (
        <SubmitConfirmModal
          counts={counts}
          onConfirm={handleSubmit}
          onCancel={() => setShowSubmitConfirm(false)}
        />
      )}
      {showTimeUp && <TimeUpModal onOk={handleSubmit} />}
    </div>
  );
}
