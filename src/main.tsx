import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import QuizFormContainer from './quizform/QuizFormContainer'
import { BrowserRouter } from 'react-router-dom';
import UserLogin from './user/login/UserLogin';
import UserRegister from './user/UserRegister';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

      {/* <QuizFormContainer /> */}
      <UserLogin />
      {/* <UserRegister /> */}

    </BrowserRouter>
  </React.StrictMode>,
);
