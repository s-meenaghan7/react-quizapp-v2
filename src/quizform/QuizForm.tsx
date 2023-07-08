import './QuizForm.css';
import QuestionComponent from './question/QuestionComponent.tsx';
import { useReducer, useRef, useState } from 'react';
import QuestionModal from './questionModal/QuestionModal';
import { Quiz } from '../types/QuizTypes.ts';
import { newQuestion } from './reducer/newQuestion.ts';
import questionsReducer from './reducer/QuestionsReducer.ts';


const QuizForm: React.FC<Quiz> = ({ quizName, questions }) => {
  const [currentQuizName, setCurrentQuizName] = useState(quizName);
  const [currentQuestions, currentQuestionsDispatch] = useReducer(questionsReducer, questions);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const nextId = useRef(questions.length + 1);

  function quizIsValid(): boolean {
    return currentQuestions.length >= 1 && currentQuizName.trim() !== '';
  }

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
            onChange={(e) => setCurrentQuizName(e.target.value)}
          />
        </div>

        <div className='question-list'>
          {
            currentQuestions.map((q, i) =>
              <QuestionComponent
                key={q.id}
                {...q}
                position={i + 1}
                questionsDispatch={currentQuestionsDispatch}
              />
            )
          }
        </div>

        <div className='form-controls'>
          <button
            type='button'
            className='quizform-btn btn'
            disabled={!quizIsValid()}
          >
            Submit Quiz
          </button>
          <button
            type='button'
            className='quizform-btn btn'
            onClick={() => setQuestionModalOpen(true)}
          >
            + New Question
          </button>
        </div>
      </form>

      <QuestionModal
        open={questionModalOpen}
        nextId={nextId}
        currentQuestion={ { ...newQuestion } }
        questionsDispatch={ currentQuestionsDispatch }
        closeModal={() => setQuestionModalOpen(false)}
        type='SAVE_QUESTION'
      />
    </>
  );
}

export default QuizForm;
