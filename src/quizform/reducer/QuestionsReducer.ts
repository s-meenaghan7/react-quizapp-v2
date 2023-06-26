import { Question } from "../types/quizFormTypes";

type Questions = Question[];

export type Action =
  | { type: 'SAVE_QUESTION'; newQuestion: Question }
  | { type: 'EDIT_QUESTION'; newQuestion: Question; }
  | { type: 'DELETE_QUESTION'; id: number; };

const questionsReducer = (state: Questions, action: Action): Questions => {
  switch (action.type) {
    case 'SAVE_QUESTION':
      return [ ...state, action.newQuestion ];
    case 'EDIT_QUESTION':
      return state.map((question) => {
        if (question.id === action.newQuestion.id)
          return action.newQuestion;
        
        return question;
      });
    case 'DELETE_QUESTION':
      let i = 0;
      return state.filter((question) => question.id !== action.id)
                  .map((question) => {
                    return { ...question, id: ++i }
                  });
    default:
      return state;
  }
};

export default questionsReducer;
