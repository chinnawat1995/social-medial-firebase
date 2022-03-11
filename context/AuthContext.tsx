import { createContext, FC, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/Init';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { UN_AUTH_PATH } from '@/constant/Project';

type auth = {
  user: User | undefined | null;
  loading: boolean;
  error: any;
};

const AuthContext = createContext<undefined | auth>(undefined);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

interface Props {
  children?: React.ReactChild | React.ReactChild[];
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  if (UN_AUTH_PATH.indexOf(router.pathname) !== -1 && user && !loading) {
    router.push('/');
  }

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};
