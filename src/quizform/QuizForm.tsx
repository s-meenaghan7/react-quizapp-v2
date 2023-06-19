import './QuizForm.css';
import QuestionComponent from './question/QuestionComponent.tsx';
import { useState } from 'react';
import QuestionModal from './questionModal/QuestionModal';
import { newQuestion } from './reducer/newQuestion.ts';

const QuizForm: React.FC = () => {
  const [questionModalOpen, setQuestionModalOpen] = useState<boolean>(false);

  return (
    <>
      <form className='quizform'>
        <div className='name-input-container'>
          <input
            required
            type='text'
            className='quizme-input'
            placeholder='What is the name of your quiz?'
          />
        </div>

        <div className='question-list'>
          <QuestionComponent />

        </div>

        <div className='form-controls'>
          <button
            type='button'
            disabled
          >
            Submit Quiz
          </button>
          <button
            type='button'
            onClick={() => setQuestionModalOpen(true)}
          >
            + New Question
          </button>
        </div>
      </form>

      <QuestionModal
        open={questionModalOpen}
        closeModal={() => setQuestionModalOpen(false)}
        currentQuestion={ newQuestion }
      />
    </>
  );
}

export default QuizForm;
