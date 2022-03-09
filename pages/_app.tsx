import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@/components/layout/Header';
import Main from '@/components/layout/Main';
import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
    </AuthProvider>
  );
}

export default MyApp;
