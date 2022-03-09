import { useAuthContext } from '@/context/AuthContext';
import { NextRouter, useRouter } from 'next/router';
import { FC } from 'react';

interface Props {}

const Header: FC<Props> = () => {
  const router: NextRouter = useRouter();
  const authContext = useAuthContext();

  const displayLogin = () => {
    let elementLogin = (
      <button
        onClick={() => router.push('login')}
        className="px-3 py-2 bg-blue-800 rounded-full text-white text-sm">
        Login
      </button>
    );

    if (authContext?.loading) {
      elementLogin = <></>;
    }

    if (!authContext?.loading && authContext?.user) {
      elementLogin = (
        <>
          <div className="flex justify-center items-center mr-2 bg-gray-100 px-2 py-1 rounded-xl">
            <img
              className="w-7 h-7 rounded-full mr-2"
              src="https://www.techhub.in.th/wp-content/uploads/2021/05/DhYGYs6WkAAScEU.jpg"
              alt=""
            />
            <span>{authContext?.user.displayName}</span>
          </div>
        </>
      );
    }

    return elementLogin;
  };

  return (
    <nav className="w-full border-b border-b-gray-200 h-12 flex justify-between">
      <div className="flex justify-center items-center h-full w-auto ml-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 stroke-blue-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="ml-2 font-bold text-blue-800">Seamless</span>
      </div>
      <div className="flex self-center mr-3">{displayLogin()}</div>
    </nav>
  );
};

export default Header;
