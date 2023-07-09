import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import QuizFormContainer from './quizform/QuizFormContainer'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './user/login/UserLogin';
import UserRegister from './user/UserRegister';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import UserProfile from './user/profile/UserProfile';
import QuizMeHome from './QuizMeHome';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<QuizMeHome />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Routes>

    </BrowserRouter>

    <ToastContainer
      transition={Flip}
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />
  </React.StrictMode>,
);
