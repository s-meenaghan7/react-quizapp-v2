import ReactDom from 'react-dom';
import './QuestionModal.css';
import { Question } from '../types/quizFormTypes';
import { useReducer, useState } from 'react';
import answersReducer from '../reducer/AnswersReducer';
import { Action } from '../reducer/QuestionsReducer';
import AnswerList from './answerlist/AnswerList';

type QuestionModalProps = {
  open: boolean;
  closeModal: () => void;
  currentQuestion: Question;
  nextId: React.MutableRefObject<number> | number;
  questionsDispatch: React.Dispatch<Action>;
  type: 'SAVE_QUESTION' | 'EDIT_QUESTION';
}

const QuestionModal: React.FC<QuestionModalProps> = ({ open, closeModal, currentQuestion, nextId, questionsDispatch, type }) => {
  if (!open) return null;
  
  const [question, setQuestion] = useState(currentQuestion.question);
  const [answers, answersDispatch] = useReducer(answersReducer, currentQuestion.options);

  const modalHeader = (type === 'SAVE_QUESTION' ? 'New' : 'Edit') + ' Question';

  function getQuestionData(): Question {
    let newId: number;

    if (typeof nextId !== 'number') {
      newId = nextId.current;
      nextId.current = nextId.current + 1;
    } else {
      newId = nextId;
    }

    return {
      id: newId,
      question: question,
      options: answers
    };
  }

  function questionIsValid(): boolean {
    return question.trim() !== '' &&
           answers.filter((a) => a.answer.trim() === '').length === 0 &&
           answers.filter((a) => a.isCorrect).length === 1;
  }

  function saveButtonHandler(): void {
    questionsDispatch({ type: type, newQuestion: getQuestionData() });
    closeModal();
  }

  return ReactDom.createPortal(
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='title-close-btn'>
          <button onClick={() => closeModal()}>
            <span className="material-icons-round">close</span>
          </button>
        </div>
        <div className='question-form'>
          <div className='question-data'>
            <h2>{modalHeader}</h2>
            <input
              required
              type='text'
              className='quizme-input'
              placeholder="What's the question?"
              defaultValue={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <AnswerList
            answers={answers}
            answersDispatch={answersDispatch}
          />

        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='modal-btn btn'
            id='cancel-btn'
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type='button'
            className='modal-btn btn'
            id='success-btn'
            disabled={!questionIsValid()}
            onClick={saveButtonHandler}
          >
            {(type === 'SAVE_QUESTION') ? 'Save' : 'Update'}
          </button>
        </div>
      </div>
    </div>,

    document.getElementById('modal-portal')!
  );
}

export default QuestionModal;
