import ReactDom from 'react-dom';
import './QuestionModal.css';
import { Question } from '../reducer/newQuestion';
import AnswerComponent from '../answer/AnswerComponent';
import { useEffect, useState } from 'react';

type QuestionModalProps = {
  open: boolean;
  closeModal: () => void;
  currentQuestion: Question;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ open, closeModal, currentQuestion }) => {
  if (!open) return null;

  const [question, setQuestion] = useState(currentQuestion.question);
  const [answers, setAnswers] = useState(currentQuestion.options);
  
  useEffect(() => {
    if (!open) return;

    const subtractAnswerBtn = document.getElementById('subtract');
    if (answers.length <= 2) {
      subtractAnswerBtn!.setAttribute('disabled', 'true');
    } else {
      subtractAnswerBtn!.removeAttribute('disabled');
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
              onChange={() => setQuestion(question)}
            />
          </div>

          <div className='answer-controls'>
            <button type='button' id='subtract' onClick={subtractAnswerField}>-</button>
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
          <button id='cancel-btn' onClick={() => closeModal()}>Cancel</button>
          <button id='success-btn'>Save</button>
        </div>
      </div>
    </div>,

    document.getElementById('modal-portal')!
  );
}

export default QuestionModal;
