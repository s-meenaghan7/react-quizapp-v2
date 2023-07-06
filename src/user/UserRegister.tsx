import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormValidator from '../services/FormValidator';
import './UserRegister.css';

import { registerNewUser } from '../services/auth.service';
import SubmitButton from './submitButton/SubmitButton';

type UserRegisterProps = {};
type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserRegister: React.FC<UserRegisterProps> = () => {
  const { register, handleSubmit, formState, getValues } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const { errors } = formState;

  const [successful, setSuccessful] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string>("");

  function onSubmit(data: FormValues) {
    const { fullName, email, password } = data;
    setLoading(true);

    registerNewUser(fullName, email, password).then(
      (response) => {
        // possibly use the response data here
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setRegisterErrorMsg(resMessage);
        setSuccessful(false);
      }
    );
  };

  function validatePasswordMatch(value: string): boolean | string {
    const pwd = getValues('password');
    return value === pwd || 'Passwords do not match';
  }

  return (
    <div id='registerform-container'>
      <h1>Login to QuizMe!</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor='fullName'>Full Name</label>
        <input
          type='text'
          id='fullName'
          className='registerform-input'
          placeholder='Full name'
          {...register('fullName', {
            required: "Name is required"
          })}
        />
        {
          errors.fullName?.message &&
          <p className='error'>{errors.fullName?.message}</p>
        }

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          className='registerform-input'
          placeholder='Email'
          {...register('email', {
            required: "Email is required",
            validate: FormValidator.validateEmail
          })}
        />
        {
          errors.email?.message &&
          <p className='error'>{errors.email?.message}</p>
        }

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          className='registerform-input'
          placeholder='Password'
          {...register('password', {
            required: "Password is required",
            validate: FormValidator.validatePassword
          })}
        />
        {
          errors.password?.message &&
          <p className='error'>{errors.password?.message}</p>
        }

        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          className='registerform-input'
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: "Confirm password is required",
            validate: validatePasswordMatch
          })}
        />
        {
          errors.confirmPassword?.message &&
          <p className='error'>{errors.confirmPassword?.message}</p>
        }

        <SubmitButton 
          loading={loading}
          content='Register Account!'
          title='Complete all fields to register your QuizMe account!'
          disabled={false}
        />

        <div></div>
      </form>
    </div>
  );
};

export default UserRegister;
