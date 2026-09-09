export function transformQuizToExam(quiz, durationSeconds = 60 * 60) {
  return {
    durationSeconds,
    candidate: { name: "Student", applicantId: "Applicant10" },
    groups: [
      {
        id: "group1",
        label: "Group 1",
        sections: [
          {
            id: "section1",
            label: "Section 1",
            marksCorrect: 1.0,
            marksNegative: 0.0,
            questions: quiz.questions.map((q, i) => ({
              id: `q${i}`,
              text: q.question,
              options: q.options.map((opt, j) => ({
                id: `q${i}_opt${j}`,
                label: opt,
              })),
              correctOptionId: q.options.indexOf(q.correct_answer),
              explanation: q.explanation,
              difficulty: q.difficulty,
            })),
          },
        ],
      },
    ],
  };
}

export function getSubjectName(quiz) {
  if (!quiz?.quiz_title) return "General";
  const title = quiz.quiz_title;
  const words = title.split(" ");
  if (words.length > 0) {
    const first = words[0];
    if (first.length <= 12) return first;
  }
  return title.slice(0, 20);
}
