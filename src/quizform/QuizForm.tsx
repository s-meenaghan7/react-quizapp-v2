import './QuizForm.css';
import QuestionComponent from './question/QuestionComponent.tsx';
import { useState } from 'react';
import QuestionModal from './questionModal/QuestionModal';
import { Question, newQuestion } from './reducer/newQuestion.ts';

type Quiz = {
  quizName: string;
  questions: Question[];
}

const QuizForm: React.FC<Quiz> = ({ questions, quizName }) => {
  const [currentQuizName, setCurrentQuizName] = useState(quizName);
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  return (
    <>
      <form className='quizform'>
        <div className='name-input-container'>
          <input
            required
            type='text'
            className='quizme-input'
            defaultValue={currentQuizName}
            placeholder='What is the name of your quiz?'
            onChange={() => setCurrentQuizName(currentQuizName)}
          />
        </div>

        <div className='question-list'>
          {
            currentQuestions.map((q, i) =>
              <QuestionComponent
                key={i}
                {...q}
              />
            )
          }
        </div>

        <div className='form-controls'>
          <button
            type='button'
            disabled={currentQuestions.length === 0}
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
