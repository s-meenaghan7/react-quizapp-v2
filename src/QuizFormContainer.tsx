import './QuizFormContainer.css';
import QuizForm from './quizform/QuizForm';
import Header from './quizform/header/Header';

const QuizFormContainer = () => {
  return (
    <div className="container">
      <Header />
      <QuizForm
        id={1}
        quizName=''
        questions={ [] }
      />
    </div>
  );
}

export default QuizFormContainer;
