import { useState } from 'react';
import type { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';

import { addDoc, query, where, getDocs } from 'firebase/firestore';
import { signUpWithEmail } from '@/lib/firebase/Auth';
import { userCollection } from '@/lib/firebase/Firestore';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/Init';

import AlertDanger from '@/components/AlertDanger';
import FormInput from '@/components/input/FormInput';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Register: NextPage = () => {
  const [error, setError] = useState<string>('');
  const router: NextRouter = useRouter();
  const [updateProfile] = useUpdateProfile(auth);

  const validation = Yup.object().shape({
    email: Yup.string().required('You have to enter your email.').email('Email is invalid.'),
    firstName: Yup.string().required('You have to enter your first name.'),
    lastName: Yup.string().required('You have to enter your last name.'),
    birthday: Yup.string().required('You have to choose your birthday.'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters.')
      .notOneOf(['password', '123456'], 'Your password is too weak.')
      .required('Password is required.'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      "Confirm Password Doesn't match."
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', resolver: yupResolver(validation) });

  const handleSignUp = async (data: { [x: string]: any }) => {
    try {
      const userQuery = query(userCollection, where('email', '==', data.email));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        await signUpWithEmail(data.email, data.password);

        await addDoc(userCollection, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          birthday: data.birthday,
        });

        await updateProfile({ displayName: `${data.firstName} ${data.lastName}` });

        router.push('/');
      } else {
        setError('Email has already used.');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const displayAlert = () => {
    if (error) {
      return <AlertDanger message={error} title={'Validate Error.'} />;
    }
  };

  return (
    <>
      {displayAlert()}

      <div className="w-[28rem] mx-auto border border-gray-100 rounded-lg">
        <div className="p-5">
          <div className="text-2xl text-gray-800 font-bold">Sign Up</div>
          <hr className="my-2" />
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="grid grid-cols-1 gap-y-2">
              <label className="" htmlFor="firstName">
                First name
              </label>
              <FormInput
                name="firstName"
                placeholder="First name"
                type="text"
                register={register}
                error={errors?.firstName?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <label className="" htmlFor="lastName">
                Last name
              </label>
              <FormInput
                name="lastName"
                placeholder="Last name"
                type="text"
                register={register}
                error={errors?.lastName?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <label className="" htmlFor="birthday">
                Birthday
              </label>
              <FormInput
                name="birthday"
                placeholder="Birthday"
                type="date"
                register={register}
                error={errors?.birthday?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2">
              <label className="" htmlFor="email">
                Email
              </label>
              <FormInput
                name="email"
                placeholder="email@example.com"
                type="text"
                register={register}
                error={errors?.email?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2 mt-3">
              <label htmlFor="password">Password</label>
              <FormInput
                name="password"
                placeholder="Please enter your password"
                type="password"
                register={register}
                error={errors?.password?.message}
              />
            </div>
            <div className="grid grid-cols-1 gap-y-2 mt-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <FormInput
                name="confirmPassword"
                placeholder="Please enter confirm password"
                type="password"
                register={register}
                error={errors?.confirmPassword?.message}
              />
            </div>
            <div className="mt-5">
              <button className="p-3 bg-blue-800 text-white rounded-md w-full">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
