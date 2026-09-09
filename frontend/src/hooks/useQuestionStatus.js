import { useState, useMemo, useCallback } from "react";

const STATUS = {
  NOT_VISITED: "NOT_VISITED",
  NOT_ANSWERED: "NOT_ANSWERED",
  ANSWERED: "ANSWERED",
  MARKED_FOR_REVIEW: "MARKED_FOR_REVIEW",
  ANSWERED_MARKED_FOR_REVIEW: "ANSWERED_MARKED_FOR_REVIEW",
};

export { STATUS };

function getInitialState(questions) {
  const state = {};
  questions.forEach((q) => {
    state[q.id] = { status: STATUS.NOT_VISITED, selectedOption: null };
  });
  return state;
}

export function useQuestionStatus(questions) {
  const [questionStates, setQuestionStates] = useState(() =>
    getInitialState(questions)
  );

  const goToQuestion = useCallback((questionId) => {
    setQuestionStates((prev) => {
      const q = prev[questionId];
      if (!q) return prev;
      if (q.status === STATUS.NOT_VISITED) {
        return {
          ...prev,
          [questionId]: { ...q, status: STATUS.NOT_ANSWERED },
        };
      }
      return prev;
    });
  }, []);

  const selectOption = useCallback((questionId, optionId) => {
    setQuestionStates((prev) => {
      const q = prev[questionId];
      if (!q) return prev;
      let newStatus;
      if (
        q.status === STATUS.MARKED_FOR_REVIEW ||
        q.status === STATUS.ANSWERED_MARKED_FOR_REVIEW
      ) {
        newStatus = STATUS.ANSWERED_MARKED_FOR_REVIEW;
      } else {
        newStatus = STATUS.ANSWERED;
      }
      return {
        ...prev,
        [questionId]: { status: newStatus, selectedOption: optionId },
      };
    });
  }, []);

  const markForReview = useCallback((questionId) => {
    setQuestionStates((prev) => {
      const q = prev[questionId];
      if (!q) return prev;
      let newStatus;
      if (q.selectedOption !== null) {
        newStatus = STATUS.ANSWERED_MARKED_FOR_REVIEW;
      } else {
        newStatus = STATUS.MARKED_FOR_REVIEW;
      }
      return {
        ...prev,
        [questionId]: { ...q, status: newStatus },
      };
    });
  }, []);

  const clearResponse = useCallback((questionId) => {
    setQuestionStates((prev) => {
      const q = prev[questionId];
      if (!q) return prev;
      let newStatus;
      if (q.status === STATUS.ANSWERED_MARKED_FOR_REVIEW) {
        newStatus = STATUS.MARKED_FOR_REVIEW;
      } else {
        newStatus = STATUS.NOT_ANSWERED;
      }
      return {
        ...prev,
        [questionId]: { status: newStatus, selectedOption: null },
      };
    });
  }, []);

  const counts = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let notVisited = 0;
    let markedForReview = 0;
    let answeredMarkedForReview = 0;

    Object.values(questionStates).forEach((q) => {
      switch (q.status) {
        case STATUS.ANSWERED:
          answered++;
          break;
        case STATUS.NOT_ANSWERED:
          notAnswered++;
          break;
        case STATUS.NOT_VISITED:
          notVisited++;
          break;
        case STATUS.MARKED_FOR_REVIEW:
          markedForReview++;
          break;
        case STATUS.ANSWERED_MARKED_FOR_REVIEW:
          answeredMarkedForReview++;
          break;
      }
    });

    return {
      answered,
      notAnswered,
      notVisited,
      markedForReview,
      answeredMarkedForReview,
      total: Object.keys(questionStates).length,
    };
  }, [questionStates]);

  return {
    questionStates,
    goToQuestion,
    selectOption,
    markForReview,
    clearResponse,
    counts,
  };
}
