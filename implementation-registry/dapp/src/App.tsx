import './App.scss';
import { Web3ApiProvider } from "@web3api/react";
import { useEffect } from 'react';
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import VersionRegistryComponent from './components/version-registry-component/VersionRegistryComponent';
import ImplementationsComponent from './components/implementations-component/ImplementationsComponent';
import ImplementationRegistryComponent from './components/implementations-registry-component/ImplementationRegistryComponent';

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

          <div className="widget-container">
            <div className="registry-container">
              <VersionRegistryComponent />
              <ImplementationRegistryComponent />
            </div>
           
            <div className="implementations-container">
              <ImplementationsComponent />    
            </div>
          </div>
          
        </Web3ApiProvider>
      </ToastProvider>
    
    </div>
  );
}

export default App;
