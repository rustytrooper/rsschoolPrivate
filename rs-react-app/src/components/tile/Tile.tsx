import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

interface InputProps {
  register?: UseFormRegister<{
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female';
    terms: boolean;
    file?: File;
  }>;
  refs?: {
    nameRef?: React.RefObject<HTMLInputElement>;
    ageRef?: React.RefObject<HTMLInputElement>;
    emailRef?: React.RefObject<HTMLInputElement>;
    passwordRef?: React.RefObject<HTMLInputElement>;
    confirmPasswordRef?: React.RefObject<HTMLInputElement>;
    genderRef?: React.RefObject<HTMLInputElement>;
    termsRef?: React.RefObject<HTMLInputElement>;
    fileRef?: React.RefObject<HTMLInputElement>;
  };
}

export const Tile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ register, refs }, ref) => {
    return (
      <div className="flex flex-col gap-4 border border-transparent rounded-lg mx-auto w-md bg-violet-300 p-10">
        <input
          type="text"
          placeholder="name"
          {...(register && register('name'))}
          ref={refs?.nameRef}
          className="border border-gray rounded-2xl pl-5"
        />
        <input
          type="number"
          placeholder="age"
          {...(register && register('age'))}
          ref={refs?.ageRef}
          className="border border-gray rounded-2xl pl-5"
        />
        <input
          type="email"
          placeholder="email"
          {...(register && register('email'))}
          ref={refs?.emailRef}
          className="border border-gray rounded-2xl pl-5"
        />
        <input
          type="password"
          placeholder="password"
          {...(register && register('password'))}
          ref={refs?.passwordRef}
          className="border border-gray rounded-2xl pl-5"
        />
        <input
          type="password"
          placeholder="confirm password"
          {...(register && register('confirmPassword'))}
          ref={refs?.passwordRef}
          className="border border-gray rounded-2xl pl-5"
        />
        <input
          type="radio"
          {...(register && register('gender'))}
          ref={refs?.genderRef}
          value="male"
        />
        Male
        <input
          type="radio"
          {...(register && register('gender'))}
          value="female"
          ref={refs?.genderRef}
        />
        Female
        <input
          type="checkbox"
          {...(register && register('terms'))}
          ref={refs?.termsRef}
        />
        Accept Terms
        <input
          type="file"
          {...(register && register('file'))}
          ref={refs?.fileRef}
        />{' '}
        Choose profile pic
      </div>
    );
  }
);
