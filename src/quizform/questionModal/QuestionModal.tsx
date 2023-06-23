import ReactDom from 'react-dom';
import './QuestionModal.css';
import { Answer, Question } from '../reducer/newQuestion';
import AnswerComponent from '../answer/AnswerComponent';
import { useEffect, useRef, useState } from 'react';

type QuestionModalProps = {
  open: boolean;
  closeModal: () => void;
  currentQuestion: Question;
  saveNewQuestion: (newQuestion: Question) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ open, closeModal, currentQuestion, saveNewQuestion }) => {
  if (!open) return null;

  const [question, setQuestion] = useState(currentQuestion.question);
  const [answers, setAnswers] = useState(currentQuestion.options);
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
    setAnswers(answers => [ ...answers, { id: answers.length + 1, answer: "", isCorrect: false } ]);
  }

  function subtractAnswerField() {
    setAnswers(answers => answers.slice(0, answers.length - 1));
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
            // onClick={() => saveNewQuestion({ id: currentQuestion.id, question: question, options: answers })}
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
