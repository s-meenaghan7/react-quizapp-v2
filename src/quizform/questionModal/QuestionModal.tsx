import ReactDom from 'react-dom';
import './QuestionModal.css';
import { Question } from '../types/quizFormTypes';
import AnswerComponent from '../answer/AnswerComponent';
import { useEffect, useReducer, useRef, useState } from 'react';
import answersReducer from '../reducer/AnswersReducer';

type QuestionModalProps = {
  open: boolean;
  closeModal: () => void;
  currentQuestion: Question;
  saveNewQuestion: (newQuestion: Question) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ open, closeModal, currentQuestion, saveNewQuestion }) => {
  if (!open) return null;
  
  const [question, setQuestion] = useState(currentQuestion.question);
  const [answers, answersDispatch] = useReducer(answersReducer, currentQuestion.options);
  const subtractBtn = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (!open) return;

    if (subtractBtn && answers.length <= 2) {
      subtractBtn.current!.setAttribute('disabled', 'true');
    } else {
      subtractBtn.current!.removeAttribute('disabled');
    }
    
  }, [answers, open]);

  function addAnswerField(): void {
    answersDispatch({ type: 'ADD_ANSWER' });
  }

  function subtractAnswerField(): void {
    answersDispatch({ type: 'REMOVE_ANSWER' });
  }

  function getNewQuestionData(): Question {
    return {
      id: currentQuestion.id,
      question: question,
      options: answers
    };
  }

  function questionIsValid(): boolean {
    return question.trim() !== '' &&
           answers.filter((a) => a.answer.trim() === '').length === 0 &&
           answers.filter((a) => a.isCorrect).length === 1;
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
            <h2>New Question</h2>
            <input
              required
              type='text'
              className='quizme-input'
              placeholder="What's the question?"
              defaultValue={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className='answer-controls'>
            <button
              type='button'
              id='subtract'
              className='btn'
              ref={subtractBtn}
              onClick={subtractAnswerField}
            >
              -
            </button>
            <button
              type='button'
              id='add'
              className='btn'
              onClick={addAnswerField}
            >
              +
            </button>
          </div>

          <div className='answers-list'>
            <table id='answer-table' width='100%'>
              <thead>
                <tr>
                  <th>Answer ID</th>
                  <th>Answer</th>
                  <th>Is Correct?</th>
                </tr>
              </thead>

              <tbody>
                {
                  answers.map((a, i) => 
                    <AnswerComponent 
                      key={i}
                      {...a}
                      changeAnswers={answersDispatch}
                    />
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn'
            id='cancel-btn'
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type='button'
            className='btn'
            id='success-btn'
            disabled={!questionIsValid()}
            onClick={() => saveNewQuestion(getNewQuestionData())}
          >
            Save
          </button>
        </div>
      </div>
    </div>,

    document.getElementById('modal-portal')!
  );
}

export default QuestionModal;
