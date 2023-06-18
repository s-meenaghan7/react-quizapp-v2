import ReactDom from 'react-dom';
import './QuestionModal.css';

type QuestionModalProps = {
  open: boolean;
  closeModal: () => void;
  data: object;
}

const QuestionModal: React.FC<QuestionModalProps> = ({ open, closeModal, data }) => {
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
              id='question-data-input'
              placeholder="What's the question?"
            />
          </div>
          <div className='answers-list'>
            <p>This is the description but eventually will contain the fields needed to create a Question. This is the description but eventually will contain the fields needed to create a Question. This is the description but eventually will contain the fields needed to create a Question. This is the description but eventually will contain the fields needed to create a Question</p>
          </div>
        </div>
        <div className='modal-footer'>
          <button id='cancel-btn' onClick={() => closeModal()}>Cancel</button>
          <button id='success-btn'>OK</button>
        </div>
      </div>
    </div>,

    document.getElementById('modal-portal')!
  );
}

export default QuestionModal;
