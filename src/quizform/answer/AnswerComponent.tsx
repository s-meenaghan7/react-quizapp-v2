import { Action } from '../reducer/AnswersReducer';
import './Answer.css';

type AnswerComponentProps = {
  id: number;
  answer: string;
  isCorrect: boolean;
  changeAnswers: React.Dispatch<Action>;
}

const AnswerComponent: React.FC<AnswerComponentProps> = ({ id, answer, isCorrect, changeAnswers }) => {
  
  function answerChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.type === 'text')
      changeAnswers({ type: 'CHANGE_ANSWER', answer: e.target.value, index: id - 1 });
    else if (e.target.type === 'radio')
      changeAnswers({ type: 'CHANGE_RADIO', index: id - 1 });
  }

  return (
    <tr className='answer'>
      <td id='answer-id'>
        {id}
      </td>

      <td>
        <input
          required
          type='text'
          name='answer'
          id={`answer${id}`}
          defaultValue={answer}
          className='quizme-input'
          placeholder={`Answer ${id}`}
          onChange={(e) => answerChangeHandler(e)}
        />
      </td>

      <td>
        <input 
          type='radio'
          name='isCorrect'
          className='radio'
          id={`radio${id}`}
          defaultChecked={isCorrect}
          onChange={(e) => answerChangeHandler(e)}
        />
        <label htmlFor={`radio${id}`}></label>
      </td>
    </tr>
  );
}

export default AnswerComponent;
