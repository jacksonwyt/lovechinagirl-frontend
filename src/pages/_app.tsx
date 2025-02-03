import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout/Layout';
import { Petit_Formal_Script } from 'next/font/google';
import ErrorBoundary from '@/components/common/ErrorBoundary';

const petitFormalScript = Petit_Formal_Script({
  weight: '400',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}