import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import useAuth from '../hooks/UseAuth';
import {
  EmailValidationCheck,
  PasswordValidationCheck,
} from '../utils/custom-validation/CustomValidation.jsx';

const Login = () => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    criteriaMode: 'all',
    shouldUnregister: true,
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await loginWithEmail(email, password);
      toast.success('Login successful! 🎉');
      navigate('/');
    } catch (err) {
      console.log(err);
      toast.error('Login failed!');
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast.success('Logged in with Google! 🎉');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Google Sign-in failed!');
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <h1 className="login-title">Login to your account</h1>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div>
          <input
            {...register('email', {
              required: 'Email is required',
              ...EmailValidationCheck,
            })}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
          <div className={`error-div ${errors.email ? 'h-fit opacity-50' : 'h-0 opacity-0'}`}>
            <div className={`error-list ${errors.email?.types?.required ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.email?.types?.required ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Email is required</p>
            </div>
            <div className={`error-list ${errors.email?.types?.validate ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.email?.types?.validate ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Email must be valid</p>
            </div>
          </div>
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              ...PasswordValidationCheck,
            })}
            className="w-full p-2 border rounded"
            placeholder="Enter password"
          />
          <div className={`error-div ${errors.password ? 'h-fit opacity-50' : 'h-0 opacity-0'}`}>
            <div
              className={`${
                errors.password?.types?.isdangerous
                  ? 'text-red-700 inline-flex items-center justify-start h-full w-full'
                  : 'hidden'
              } absolute top-0 left-0 dark:bg-black bg-gray-300`}
            >
              <FaTimesCircle />
              <p>Dangerous content detected</p>
            </div>
            <div className={`error-list ${errors.password?.types?.islength ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.islength ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Password must be at least 6 characters</p>
            </div>
            <div className={`error-list ${errors.password?.types?.isuppercase ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.isuppercase ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Must include 1 uppercase letter</p>
            </div>
            <div className={`error-list ${errors.password?.types?.isspacial ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.isspacial ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Must include 1 special character</p>
            </div>
            <div className={`error-list ${errors.password?.types?.isdigit ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.isdigit ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Must include 1 number</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`login-button ${isSubmitting || !isValid ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          Login
        </button>
      </form>

      {/* Google Login */}
      <button className="google-button" onClick={handleGoogleSignIn}>
        <span className="inline-flex items-center justify-center">
          <FcGoogle className="text-3xl" /> Login with Google
        </span>
      </button>

      {/* Navigation Links */}
      <p className="mt-4 text-center">
        Don’t have an account? <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>

      {/* Home Button */}
      <div className="mt-6 text-center">
        <Link to="/">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            ⬅ Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
