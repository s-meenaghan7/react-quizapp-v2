import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import QuizFormContainer from './quizform/QuizFormContainer'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

      <QuizFormContainer />
      
    </BrowserRouter>
  </React.StrictMode>,
);
