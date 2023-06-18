import './Answer.css';

type Answer = {
  id: number;
  answer: string;
  isCorrect: boolean;
}

const Answer: React.FC<Answer> = ({ id, answer, isCorrect }) => {
  return (
    <tr className='answer'>
      <td id='answer-id'>
        {id}
      </td>

      <td>
        <input 
          type='text'
          name='answer'
          className='quizme-input'
          id={`answer${id}`}
          placeholder={`Answer ${id}`}
          defaultValue={answer}
          required
        />
      </td>

      <td>
        <input 
          type='radio'
          name='isCorrect'
          className='radio'
          id={`radio${id}`}
          defaultChecked={isCorrect}
        />
        <label htmlFor={`radio${id}`}></label>
      </td>
    </tr>
  );
}

export default Answer;
