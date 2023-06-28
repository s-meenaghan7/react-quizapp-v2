import { Action, Answers } from '../../reducer/AnswersReducer';
import AnswerComponent from '../answer/AnswerComponent';
import './AnswerList.css';
import React from 'react';

type AnswerListProps = {
  answers: Answers;
  answersDispatch: React.Dispatch<Action>;
}

const AnswerList: React.FC<AnswerListProps> = ({ answers, answersDispatch }) => {
  return (
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
  );
}

export default AnswerList;
