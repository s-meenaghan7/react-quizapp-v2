import { Action, Answers } from '../../reducer/AnswersReducer';
import AnswerComponent from '../answer/AnswerComponent';
import './AnswerList.css';
import React, { useEffect, useRef } from 'react';

type AnswerListProps = {
  answers: Answers;
  answersDispatch: React.Dispatch<Action>;
}

const AnswerList: React.FC<AnswerListProps> = ({ answers, answersDispatch }) => {
  const subtractBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    if (subtractBtn && answers.length <= 2) {
      subtractBtn.current!.setAttribute('disabled', 'true');
    } else {
      subtractBtn.current!.removeAttribute('disabled');
    }
  }, [answers, open]);

  function addAnswerField(): void {
    answersDispatch({ type: 'ADD_ANSWER' });
  }

  function subtractAnswerField(): void {
    answersDispatch({ type: 'REMOVE_ANSWER' });
  }

  return (
    <>
      <div className='answer-controls'>
        <button
          type='button'
          id='subtract'
          className='answer-btn btn'
          ref={subtractBtn}
          onClick={subtractAnswerField}
        >
          -
        </button>
        <button
          type='button'
          id='add'
          className='answer-btn btn'
          onClick={addAnswerField}
        >
          +
        </button>
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
              answers.map((a, i) =>
                <AnswerComponent
                  key={i}
                  {...a}
                  changeAnswers={answersDispatch}
                />
              )
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AnswerList;
