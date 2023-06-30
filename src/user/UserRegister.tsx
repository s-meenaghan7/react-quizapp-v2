import React from 'react';
import { useForm } from 'react-hook-form';
import FormValidator from '../services/FormValidator';

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

  function onSubmit(data: FormValues) {
    console.log('register form submitted', data);
  }

  function validatePasswordMatch(value: string): boolean | string {
    const pwd = getValues('password');
    return value === pwd || 'Passwords do not match';
  }

  return (
    <div className='registerform-container'>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor='fullName'>Full Name</label>
        <input
          type='text'
          id='fullName'
          placeholder='Full name'
          {...register('fullName', {
            required: "Name is required"
          })}
        />
        <p className='error'>{errors.fullName?.message}</p>

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          placeholder='Email'
          {...register('email', {
            required: "Email is required",
            validate: FormValidator.validateEmail
          })}
        />
        <p className='error'>{errors.email?.message}</p>

        <label htmlFor='password'></label>
        <input
          type='password'
          id='password'
          placeholder='Password'
          {...register('password', {
            required: "Password is required",
            validate: FormValidator.validatePassword
          })}
        />
        <p className='error'>{errors.password?.message}</p>

        <label htmlFor='confirmPassword'></label>
        <input
          type='password'
          id='confirmPassword'
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: "Confirm password is required",
            validate: validatePasswordMatch
          })}
        />
        <p className='error'>{errors.confirmPassword?.message}</p>

        <button>Submit</button>

        <div></div>
      </form>
    </div>
  );
};

export default UserRegister;
