import './App.scss';
import ImplementationsComponent from './components/ImplementationsComponent';
import VersionRegistryComponent from './components/VersionRegistryComponent';
import ImplementationRegistryComponent from './components/ImplementationRegistryComponent';
import { Web3ApiProvider } from "@web3api/react";
import { useEffect } from 'react';
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';

function App() {
  const ethereum = (window as any).ethereum;

  useEffect(() => {
    (async () => {
      if (ethereum) {
        await ethereum.request({ method: "eth_requestAccounts" });
      } else {
        throw Error("Please install Metamask.");
      }
    })();
  }, []);

  const redirects: any[] = [
    {
      uri: "w3://ens/ethereum.web3api.eth",
      plugin: ethereumPlugin({
        networks: {
          rinkeby: {
            provider: ethereum
          }
        }
      }),
    }
  ];

  return (
    
    <div className="App">
    
      <ToastProvider>
        <Web3ApiProvider plugins={redirects}>
          <div>
            <h3>Interface Implementations</h3>
          </div>

          <VersionRegistryComponent />
          
          <ImplementationRegistryComponent />
          
          <ImplementationsComponent />    
        </Web3ApiProvider>
      </ToastProvider>
    
    </div>
  );
}

export default App;
