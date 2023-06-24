import { Answer } from "./newQuestion";

export type Answers = Answer[];

export type Action = 
  | { type: 'ADD_ANSWER'; }
  | { type: 'REMOVE_ANSWER'; }
  | { type: 'CHANGE_ANSWER'; index: number; answer: string; }
  | { type: 'CHANGE_RADIO'; index: number; };

const answersReducer = (state: Answers, action: Action): Answers => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return [ ...state, { id: state.length + 1, answer: "", isCorrect: false }];
    case 'REMOVE_ANSWER':
      return state.slice(0, state.length - 1);
    case 'CHANGE_ANSWER':
      return state.map((answer, i) => {
        if (action.index === i)
          return { ...answer, answer: action.answer };
        else
          return answer;
      });
    case 'CHANGE_RADIO':
      return state.map((answer, i) => {
        if (action.index === i)
          return { ...answer, isCorrect: true };
        else
          return { ...answer, isCorrect: false };
      });
    default:
      return state;
  }
};

export default answersReducer;
