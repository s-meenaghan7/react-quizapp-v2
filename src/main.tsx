import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import QuizForm from './quizform/QuizForm'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QuizForm />
  </React.StrictMode>,
)
