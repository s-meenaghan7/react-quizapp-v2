import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import QuizFormContainer from './quizform/QuizFormContainer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QuizFormContainer />
  </React.StrictMode>,
)
