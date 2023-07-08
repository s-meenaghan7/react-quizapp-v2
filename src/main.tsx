import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import QuizFormContainer from './quizform/QuizFormContainer'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLogin from './user/login/UserLogin';
import UserRegister from './user/UserRegister';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>

      {/* <QuizFormContainer /> */}
      {/* <UserLogin /> */}
      <UserRegister />

      <Routes>
        <Route path='/login' element={<UserLogin />} />
        <Route path='/register' element={<UserRegister />} />
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
