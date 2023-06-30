import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import './UserLogin.css';

import { login } from '../../services/auth.service';
import { ClipLoader } from 'react-spinners';

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

  function onSubmit(data: FormValues) {
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

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

        {
          loading
            ?
            <div id='loader-container'>
              <ClipLoader
                color={'#0f0'}
                loading={loading}
                cssOverride={{}}
                size={30}
              />
            </div>
            :
            <button
              id='login-btn'
              title='Enter your username and password to login'
            >
              Login
            </button>
        }

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
