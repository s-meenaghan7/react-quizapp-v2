import ReactDom from 'react-dom';
import './QuestionModal.css';
import { Question } from '../reducer/newQuestion';
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

  function addAnswerField() {
    answersDispatch({ type: 'ADD_ANSWER' });
  }

  function subtractAnswerField() {
    answersDispatch({ type: 'REMOVE_ANSWER' });
  }

  function getNewQuestionData() {
    return { 
      id: currentQuestion.id,
      question: question,
      options: answers
    };
  }

  return ReactDom.createPortal(
    <div className='modal-overlay'>
      <div className='modal-container'>
        <div className='title-close-btn'>
          <button onClick={() => closeModal()}> &times; </button>
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
            <button type='button' id='subtract' ref={subtractBtn} onClick={subtractAnswerField}>-</button>
            <button type='button' id='add' onClick={addAnswerField}>+</button>
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
            id='cancel-btn'
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button
            type='button'
            id='success-btn'
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
