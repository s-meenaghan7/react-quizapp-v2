import { Question } from '../types/quizFormTypes';
import './Question.css';

const QuestionComponent: React.FC<Question> = ({ id, question, options }) => {
  return (
    <div className="question centered">
      <div className='question-id'>
        {id}.
      </div>

      <div className='question-section'>
        {question}
      </div>

      <div className='question-controls'>
        <button
          type='button'
          className='question-btn'
          title='Edit question'
        >
          <span id='edit' className="material-icons-round">
            edit
          </span>
        </button>
        <button
          type='button'
          className='question-btn'
          title='Delete question'
        >
          <span id='delete' className="material-icons-round">
            delete_forever
          </span>
        </button>
      </div>

      <div className='answers-length'>
        ({options.length} answers)
      </div>
    </div>
  );
}

export default QuestionComponent;
