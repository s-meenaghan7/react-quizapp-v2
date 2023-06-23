import { Question } from '../reducer/newQuestion';
import './Question.css';

const QuestionComponent: React.FC<Question> = ({ id, question, options }) => {
  return (
    <div className="question">
      <div>
        {id}. ({options.length} answers)
      </div>
      <div>
        {question}
      </div>
      <div>
        <button type='button'> &times; </button>
      </div>
    </div>
  );
}

export default QuestionComponent;
