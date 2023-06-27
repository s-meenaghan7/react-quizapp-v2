import { useState } from 'react';
import { Answer } from '../types/quizFormTypes';
import './Question.css';
import { Action } from '../reducer/QuestionsReducer';
import QuestionModal from '../questionModal/QuestionModal';

type QuestionComponentProps = {
  id: number;
  question: string;
  options: Answer[];
  questionsDispatch: React.Dispatch<Action>;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ id, question, options, questionsDispatch }) => {
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  return (
    <>
      <div className="question-component centered">
        <div className='question-id'>
          {id}.
        </div>

        <div className='question-section'>
          {question}
        </div>

        <div className='question-controls'>
          <button
            type='button'
            className='question-btn'
            title='Edit question'
            onClick={() => setQuestionModalOpen(true)}
          >
            <span id='edit' className="material-icons-round">
              edit
            </span>
          </button>
          <button
            type='button'
            className='question-btn'
            title='Delete question'
            onClick={() => questionsDispatch({ type: 'DELETE_QUESTION', id: id })}
          >
            <span id='delete' className="material-icons-round">
              delete_forever
            </span>
          </button>
        </div>

        <div className='answers-length'>
          ({options.length} answers)
        </div>
      </div>

      <QuestionModal
        open={questionModalOpen}
        currentQuestion={{ id, question, options }}
        questionsDispatch={questionsDispatch}
        closeModal={() => setQuestionModalOpen(false)}
        type='EDIT_QUESTION'
      />
    </>
  );
}

export default QuestionComponent;
