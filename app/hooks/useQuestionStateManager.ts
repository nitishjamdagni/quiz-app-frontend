// hooks/useQuestionStateManager.ts
import { useState, useEffect } from "react";
import { QuestionState } from "@/constants/mockQuestion";
import { mockQuestions } from "@/constants/mockQuestion";

export function useQuestionStateManager() {
  const totalQuestions = mockQuestions.length;

  const [questionStates, setQuestionStates] = useState<QuestionState[]>(
    mockQuestions.map(() => ({
      visited: false,
      answered: false,
      markedForReview: false,
      selectedOption: null,
    }))
  );

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const selectOption = (option: string) => {
    setQuestionStates((prev) => {
      const updated = [...prev];
      const current = updated[currentQuestion];

      if (current.selectedOption === option) {
        current.selectedOption = null;
        current.answered = false;
      } else {
        current.selectedOption = option;
        current.answered = true;
      }

      return updated;
    });
  };

  const toggleMarkForReview = () => {
    setQuestionStates((prev) => {
      const updated = [...prev];
      updated[currentQuestion].markedForReview =
        !updated[currentQuestion].markedForReview;
      return updated;
    });
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const goToNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  useEffect(() => {
    setQuestionStates((prev) => {
      const updated = [...prev];
      updated[currentQuestion].visited = true;
      return updated;
    });
  }, [currentQuestion]);

  const answeredCount = questionStates.filter((q) => q.answered).length;
  const unansweredCount = questionStates.filter((q) => !q.answered).length;
  const markedCount = questionStates.filter((q) => q.markedForReview).length;

  return {
    questionStates,
    currentQuestion,
    setCurrentQuestion,
    question: mockQuestions[currentQuestion],
    state: questionStates[currentQuestion],
    selectOption,
    toggleMarkForReview,
    goToQuestion,
    goToNext,
    goToPrevious,
    answeredCount,
    unansweredCount,
    markedCount,
    totalQuestions,
  };
}
