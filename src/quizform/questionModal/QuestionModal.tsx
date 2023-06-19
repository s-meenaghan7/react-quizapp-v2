import ReactDom from 'react-dom';
import './QuestionModal.css';
import { Question } from '../reducer/newQuestion';
import AnswerComponent from '../answer/AnswerComponent';

type QuestionModalProps = {
  open: boolean;
  closeModal: () => void;
  currentQuestion: Question;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ open, closeModal, currentQuestion }) => {
  if (!open) return null;

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
            />
          </div>

          <div className='answer-controls'>
            <button type='button' id='subtract'>-</button>
            <button type='button' id='add'>+</button>
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
                  currentQuestion.options.map((a, i) => 
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
