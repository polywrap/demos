import React from 'react';
import { PolywrapProvider } from '@polywrap/react';
import { HelloWorld } from './HelloWorld';
import { Header } from './Header';
import Logo from './logo.png';
import './App.css';
import {ClientConfigBuilder} from "@polywrap/client-js";

export const App: React.FC = () => {

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
      <Header />
      <div className='main'>
        <img src={Logo} className='main__logo' />
        <HelloWorld />
      </div>
    </PolywrapProvider>
  );
};
