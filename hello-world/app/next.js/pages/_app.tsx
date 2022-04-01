import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Web3ApiManager from '../web3api.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ApiManager>
      <Component {...pageProps} />
    </Web3ApiManager>
  );
}

export default MyApp;
