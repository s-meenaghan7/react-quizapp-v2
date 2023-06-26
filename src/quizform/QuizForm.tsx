import './QuizForm.css';
import QuestionComponent from './question/QuestionComponent.tsx';
import { useReducer, useState } from 'react';
import QuestionModal from './questionModal/QuestionModal';
import { Question, Quiz } from './types/quizFormTypes.ts';
import { newQuestion } from './reducer/newQuestion.ts';
import questionsReducer from './reducer/QuestionsReducer.ts';


const QuizForm: React.FC<Quiz> = ({ quizName, questions }) => {
  const [currentQuizName, setCurrentQuizName] = useState(quizName);
  const [currentQuestions, currentQuestionsDispatch] = useReducer(questionsReducer, questions);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);

  function saveNewQuestion(newQuestion: Question) {
    console.log(newQuestion);
    // setCurrentQuestions(currentQuestions => [...currentQuestions, newQuestion]);
    // currentQuestionsDispatch({ type: 'SAVE_QUESTION', question: newQuestion });
    setQuestionModalOpen(false);
  }

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
                key={i}
                {...q}
                setQuestions={currentQuestionsDispatch}
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
        currentQuestion={ { ...newQuestion, id: currentQuestions.length + 1 } }
        saveNewQuestion={ saveNewQuestion }
        closeModal={() => setQuestionModalOpen(false)}
      />
    </>
  );
}

export default QuizForm;
