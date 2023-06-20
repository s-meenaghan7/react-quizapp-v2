import './QuizFormContainer.css';
import QuizForm from './quizform/QuizForm';
import Header from './quizform/header/Header';

const QuizFormContainer = () => {
  return (
    <div className="container">
      <Header />
      <QuizForm 
        questions={ [] }
      />
    </div>
  );
}

export default QuizFormContainer;
