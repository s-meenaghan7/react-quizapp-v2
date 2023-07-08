import { Quiz } from "./QuizTypes";

export type QuizMeUser = {
  id?: any | null;
  fullName: string;
  email: string;
  password: string;
  quizzes: Quiz[]; // confirm with backend and database
}
