import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormValidator from '../services/FormValidator';
import './UserRegister.css';

import { registerNewUser, resendVerificationEmail } from '../services/auth.service';
import SubmitButton from './submitButton/SubmitButton';

type UserRegisterProps = {};
type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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
  const [registerErrorMsg, setRegisterErrorMsg] = useState<string>('');

  function submitRegistration(data: FormValues) {
    const { fullName, email, password } = data;
    setLoading(true);
    setRegisterErrorMsg('');

    registerNewUser(fullName, email, password)
      .then(response => {
        // The registration request was successful
        console.log(response);

        setSuccessful(true);
      })
      .catch(error => {
        // An error occurred during the registration request
        let resMessage = (error.response?.data) ? error.response.data : 'No response from server';

        console.log(error);
        console.log(resMessage);

        setSuccessful(false);
        setRegisterErrorMsg(resMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function validatePasswordMatch(value: string): boolean | string {
    const pwd = getValues('password');
    return value === pwd || 'Passwords do not match';
  };

  function resendEmail() {
    console.log("Resend email button");

    const email = getValues().email;
    setLoading(true);

    resendVerificationEmail(email)
      .then(response => {
        console.log(response);

        // use ToastService to create a toast with successful message

      }).catch(error => {
        console.log(error);

        // use ToastService to create a toast with failure message

      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div id='registerform-container'>
      {
        !successful
          ?
          <>
            <h1>Next Steps: Email Verification</h1>
            <div id='verification-message'>
              <p>
                Your account registration was successful! You will receive an email from QuizMe with a link to activate your account. Please check your email: {getValues().email}.
              </p>
              <p>
                Your account must be activated before you can login to QuizMe. You have 30 minutes to confirm your account creation before the link expires.
              </p>
            </div>

            <SubmitButton
              color='#ffc700'
              loading={loading}
              content='Resend Email'
              onClick={resendEmail}
              title='Click here if you did not receive a verification email'
            />
          </>
          :
          <>
            <h1>Create your QuizMe account!</h1>

            {(registerErrorMsg !== '') &&
              <p className='error' id='register-error'>{registerErrorMsg}</p>}

            <form onSubmit={handleSubmit(submitRegistration)} noValidate>
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

              {errors.fullName?.message &&
                <p className='error'>{errors.fullName?.message}</p>}


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

              {errors.email?.message &&
                <p className='error'>{errors.email?.message}</p>}


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

              {errors.password?.message &&
                <p className='error'>{errors.password?.message}</p>}


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

              {errors.confirmPassword?.message &&
                <p className='error'>{errors.confirmPassword?.message}</p>}


              <SubmitButton
                disabled={false}
                loading={loading}
                content='Register Account!'
                title='Complete all fields to register your QuizMe account!'
              />

              <div>
                links to login here
              </div>
            </form>
          </>
      }
    </div>
  );
};

export default UserRegister;
