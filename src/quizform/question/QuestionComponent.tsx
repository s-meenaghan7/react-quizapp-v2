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
  const [isPendingDelete, setIsPendingDelete] = useState(false);

  function deleteQuestion() {
    setIsPendingDelete(false);
    questionsDispatch({ type: 'DELETE_QUESTION', id: id });
  }

  return (
    <>
      <div className={`question-component centered ${isPendingDelete ? 'pending-delete' : ''}`}>
        <div className='question-id'>
          {id}.
        </div>
        {
          isPendingDelete ?
            <>
              <div className='confirmation'>
                Delete question {id} (Answers: {options.length})?
              </div>
              <div className='question-controls'>
                <button
                  type='button'
                  className='question-btn'
                  title='Confirm Delete Question'
                  onClick={deleteQuestion}
                >
                  <span id='confirm' className="material-icons-round">
                    check
                  </span>
                </button>
                <button
                  type='button'
                  className='question-btn'
                  title='Cancel Delete Question'
                  onClick={() => setIsPendingDelete(false)}
                >
                  <span id='' className="material-icons-round">
                    close
                  </span>
                </button>
              </div>
            </>
            :
            <>
              <div className='question-section'>
                {question}
              </div>

              <div className='question-controls'>
                <button
                  type='button'
                  className='question-btn'
                  title={`Edit question ${id}`}
                  onClick={() => setQuestionModalOpen(true)}
                >
                  <span id='edit' className="material-icons-round">
                    edit
                  </span>
                </button>
                <button
                  type='button'
                  className='question-btn'
                  title={`Delete question ${id}`}
                  onClick={() => setIsPendingDelete(true)}
                >
                  <span id='delete' className="material-icons-round">
                    delete_forever
                  </span>
                </button>
              </div>

              <div className='answers-length'>
                (Answers: {options.length})
              </div>
            </>
        }
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
