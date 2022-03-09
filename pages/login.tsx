import type { NextPage } from 'next';
import { signInWithEmail, signInWithGoogle } from '@/lib/firebase/Auth';
import { MouseEvent, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

//component
import AlertDanger from '@/components/AlertDanger';
import FormInput from '@/components/input/FormInput';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Login: NextPage = () => {
  const router: NextRouter = useRouter();
  const [error, setError] = useState('');

  const validation = Yup.object().shape({
    email: Yup.string().required('You have to enter your email.').email('Email is invalid.'),
    password: Yup.string().required('Password is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', resolver: yupResolver(validation) });

  const handleSignInWithGoogle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithGoogle();
  };

  const handleSignInWithEmail = async (data: any) => {
    try {
      await signInWithEmail(data.email, data.password);

      router.push('/');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <AlertDanger message={error} />;
      <div className="w-[28rem] mx-auto border border-gray-100 rounded-lg">
        <div className="p-5">
          <form onSubmit={handleSubmit(handleSignInWithEmail)}>
            <div className="grid grid-cols-1 gap-y-2">
              <label className="" htmlFor="email">
                Email
              </label>
              <FormInput
                name="email"
                placeholder="Please enter your email"
                register={register}
                error={errors?.email?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2 mt-3">
              <label htmlFor="password">Password</label>
              <FormInput
                name="password"
                type="password"
                placeholder="Please enter your password"
                register={register}
                error={errors?.password?.message}
              />
            </div>
            <div className="mt-5 space-y-2">
              <button className="p-3 bg-blue-800 text-white rounded-md w-full">Login</button>
              <button
                className="p-3 text-black rounded-md w-full hover:bg-blue-400 hover:text-white"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('register');
                }}>
                Register
              </button>
            </div>
          </form>
          <hr className="border border-gray-200 my-5" />
          <div className="flex flex-col">
            <button
              className="flex justify-center items-center p-1 border border-gray-100 text-gray-800 rounded-md w-full"
              onClick={handleSignInWithGoogle}>
              <img className="mr-2" src="https://img.icons8.com/color/48/000000/google-logo.png" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
