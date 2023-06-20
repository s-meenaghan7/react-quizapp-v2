import './QuizForm.css';
import QuestionComponent from './question/QuestionComponent.tsx';
import { useState } from 'react';
import QuestionModal from './questionModal/QuestionModal';
import { Question, newQuestion } from './reducer/newQuestion.ts';

type Quiz = {
  questions: Question[];
}

const QuizForm: React.FC<Quiz> = ({ questions }) => {
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  const [questionModalOpen, setQuestionModalOpen] = useState<boolean>(false);

  return (
    <>
      <form className='quizform'>
        <div className='name-input-container'>
          <input
            required
            type='text'
            className='quizme-input'
            placeholder='What is the name of your quiz?'
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
            disabled
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
