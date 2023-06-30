import './QuizFormContainer.css';
import QuizForm from './QuizForm';
import Header from './header/Header';
import { Question } from '../types/quizTypes.type';

const QuizFormContainer = () => {

  const TEST_QUIZ_DATA: Question[] = [
    {
      id: 1,
      question: "Here is the first question",
      options: [
        { id: 1, answer: "first answer", isCorrect: false },
        { id: 2, answer: "second answer", isCorrect: true },
      ]
    },
    {
      id: 2,
      question: "I am the second and better question",
      options: [
        { id: 1, answer: "first answer", isCorrect: false },
        { id: 2, answer: "second answer", isCorrect: false },
        { id: 3, answer: "THIRD answer", isCorrect: true },
      ]
    },
    {
      id: 3,
      question: "I am the THIRD and better question",
      options: [
        { id: 1, answer: "first answer", isCorrect: true },
        { id: 2, answer: "second answer", isCorrect: false },
      ]
    },
    {
      id: 4,
      question: "I am the FOURTH and better question",
      options: [
        { id: 1, answer: "first answer", isCorrect: false },
        { id: 2, answer: "second answer", isCorrect: false },
        { id: 3, answer: "third answer", isCorrect: false },
        { id: 4, answer: "FOURTH answer", isCorrect: true },
      ]
    }
  ];

  return (
    <div className="container">
      <Header />
      <QuizForm
        id={1}
        quizName='I am the quiz name'
        questions={ [...TEST_QUIZ_DATA] }
      />
    </div>
  );
}

export default QuizFormContainer;
