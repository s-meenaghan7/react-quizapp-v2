export type Quiz = {
  id: number;
  quizName: string;
  questions: Question[];
}

export type Question = {
  id: number;
  question: string;
  options: Answer[];
}

export type Answer = {
  id: number;
  answer: string;
  isCorrect: boolean;
}
