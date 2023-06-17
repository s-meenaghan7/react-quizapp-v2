import './QuizForm.css';
import Question from './question/Question';

const QuizForm = () => {
  return (
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
        >
          + New Question
        </button>
      </div>
    </form>
  );
}

export default QuizForm;
