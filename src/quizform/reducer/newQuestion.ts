export type Answer = {
  id: number;
  answer: string;
  isCorrect: boolean;
}

export type Question = {
  id: number;
  question: string;
  options: Answer[];
}

export const newQuestion: Question = {
  id: 1,
  question: "",
  options: [
    { id: 1, answer: "", isCorrect: false },
    { id: 2, answer: "", isCorrect: false },
  ]
};
