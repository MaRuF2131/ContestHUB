import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import useAuth from '../../hook/UseAuth.jsx';
import {
  EmailValidationCheck,
  PasswordValidationCheck,
} from '../../utils/custom-validation/CustomValidation.jsx';

const Login = () => {
  const { loginWithGoogle, loginWithEmail } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const pth=location?.state?.from || '/'

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
      navigate(pth);
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
      navigate(pth);
    } catch (err) {
      console.error(err);
      toast.error('Google Sign-in failed!');
      setError(err.message);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center max-w-lg dark:bg-black/50 bg-white/5 p-8  backdrop-blur-md rounded-md shadow-md border-1 border-blue-700 dark:text-white text-black space-y-2">
      <h1 className=" text-3xl font-bold text-shadow-md text-shadow-blue-700">Login to your account</h1>

      <form className="flex flex-col justify-center items-center w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className='w-full p-1 rounded space-y-1 '>
          <input
            {...register('email', {
              required: 'Email is required',
              ...EmailValidationCheck,
            })}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
          <div className={`flex flex-col items-start justify-start w-full p-2 border-1 border-blue-700 rounded-md transform transition-all duration-1000 overflow-hidden relative ${errors.email ? 'h-fit opacity-50' : 'h-0 opacity-0'}`}>
            <div className={`inline-flex items-center justify-between  gap-2 ${errors.email?.types?.required ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.email?.types?.required ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Email is required</p>
            </div>
            <div className={`inline-flex items-center justify-between  gap-2 ${errors.email?.types?.validate ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.email?.types?.validate ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Email must be valid</p>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className='w-full p-1 rounded space-y-1 '>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              ...PasswordValidationCheck,
            })}
            className="w-full p-2 border rounded"
            placeholder="Enter password"
          />
          <div className={`flex flex-col items-start justify-start w-full p-2 border-1 border-blue-700 rounded-md transform transition-all duration-1000 overflow-hidden relative ${errors.password ? 'h-fit opacity-50' : 'h-0 opacity-0'}`}>
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
            <div className={`inline-flex items-center justify-between  gap-2 ${errors.password?.types?.islength ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.islength ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Password must be at least 6 characters</p>
            </div>
            <div className={`inline-flex items-center justify-between gap-2 ${errors.password?.types?.isuppercase ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.isuppercase ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Must include 1 uppercase letter</p>
            </div>
            <div className={`inline-flex items-center justify-between  gap-2 ${errors.password?.types?.isspacial ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.isspacial ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Must include 1 special character</p>
            </div>
            <div className={`inline-flex items-center justify-between  gap-2 ${errors.password?.types?.isdigit ? 'text-red-700' : 'text-blue-700'}`}>
              {errors.password?.types?.isdigit ? <FaTimesCircle /> : <FaCheckCircle />}
              <p>Must include 1 number</p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`cursor-pointer border-1 border-blue-700 bg-blue-700 hover:bg-blue-500 rounded-md px-5 py-1 ${isSubmitting || !isValid ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
          Login
        </button>
      </form>

      {/* Google Login */}
      <button className="cursor-pointer" onClick={handleGoogleSignIn}>
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
