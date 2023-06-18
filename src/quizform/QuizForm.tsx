import './QuizForm.css';
import Question from './question/Question';
import { useState } from 'react';
import QuestionModal from './questionModal/QuestionModal';

const QuizForm: React.FC = () => {
  const [questionModalOpen, setQuestionModalOpen] = useState<boolean>(false);

  return (
    <>
      <form className='quizform'>
        <div className='name-input-container'>
          <input
            required
            type='text'
            id='quiz-name-input'
            placeholder='What is the name of your quiz?'
          />
        </div>

        <div className='question-list'>
          <Question />

        </div>

        <div className='form-controls'>
          <button
            type='button'
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
        data={{}}
      />
    </>
  );
}

export default QuizForm;
