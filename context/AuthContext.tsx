import { createContext, FC, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/Init';
import { User } from 'firebase/auth';

type auth = {
  user: User;
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
  const [user, loading, error] = useAuthState(auth);

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};
