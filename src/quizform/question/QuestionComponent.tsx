import { Answer } from '../types/quizFormTypes';
import './Question.css';
import { Action } from '../reducer/QuestionsReducer';

type QuestionComponentProps = {
  id: number;
  question: string;
  options: Answer[];
  setQuestions: React.Dispatch<Action>;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({ id, question, options, setQuestions }) => {


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
          // onClick={} // open the QuestionModal with this questions components data, and the save button is now for editting.
        >
          <span id='edit' className="material-icons-round">
            edit
          </span>
        </button>
        <button
          type='button'
          className='question-btn'
          title='Delete question'
          onClick={() => setQuestions({ type: 'DELETE_QUESTION', id: id })}
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
