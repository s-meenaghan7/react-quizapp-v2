import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import './UserLogin.css';

import { login } from '../../services/auth.service';
import SubmitButton from '../submitButton/SubmitButton';

type UserLoginProps = {}
type FormValues = {
  username: string;
  password: string;
}

const UserLogin: React.FC<UserLoginProps> = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const { errors } = formState;
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState<string>('');

  function submitLoginDetails(data: FormValues) {
    const { username, password } = data;

    setLoginErrorMsg('');
    setLoading(true);

    login(username, password).then(
      () => {
        navigate("/profile");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setLoginErrorMsg(resMessage);
      }
    );
  };

  return (
    <div id='loginform-container'>
      <h1>Login to QuizMe!</h1>
      {
        (loginErrorMsg !== '') &&
        <p id='login-error' className='error'>{loginErrorMsg}</p>
      }

      <form onSubmit={handleSubmit(submitLoginDetails)} noValidate>
        <label htmlFor='username'>Username</label>
        <input
          className='loginform-input'
          type='text'
          id='username'
          placeholder='Username'
          {...register('username', {
            required: "Username is required"
          })}
        />
        {
          errors.username?.message && 
          <p className='error'>{errors.username?.message}</p>
        }

        <label htmlFor='password'>Password</label>
        <input
          className='loginform-input'
          type='password'
          id='password'
          placeholder='Password'
          {...register('password', {
            required: "Password is required",
          })}
        />
        {
          errors.password?.message &&
          <p className='error'>{errors.password?.message}</p>
        }

        <SubmitButton 
          loading={loading}
          content='LOGIN'
          title='Enter your username and password to login to QuizMe'
          disabled={false}
        />

        <div id='links-container'>
          <p>
            Here is a what will be a link
          </p>

          <p>
            And another potential link
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
