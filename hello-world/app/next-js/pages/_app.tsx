import '../styles/globals.css';
import type { AppProps } from 'next/app';
import PolywrapManager from '../polywrap.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PolywrapManager>
      <Component {...pageProps} />
    </PolywrapManager>
  );
}

export default MyApp;
