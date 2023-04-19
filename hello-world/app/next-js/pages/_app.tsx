import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {ClientConfigBuilder} from "@polywrap/client-js";
import {PolywrapProvider} from "@polywrap/react";

function MyApp({ Component, pageProps }: AppProps) {

  const config = new ClientConfigBuilder().addDefaults().config

  return (
    <PolywrapProvider
      wrappers={config.wrappers}
      packages={config.packages}
      envs={config.envs}
      interfaces={config.interfaces}
      redirects={config.redirects}
      resolvers={config.resolvers}
    >
      <Component {...pageProps} />
    </PolywrapProvider>
  );
}

export default MyApp;
