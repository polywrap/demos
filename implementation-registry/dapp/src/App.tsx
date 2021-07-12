import './App.scss';
import ImplementationsComponent from './components/ImplementationsComponent';
import VersionRegistryComponent from './components/VersionRegistryComponent';
import ImplementationRegistryComponent from './components/ImplementationRegistryComponent';
import { Web3ApiProvider } from "@web3api/react";
import { useEffect } from 'react';
import { Web3ApiClient, UriRedirect } from "@web3api/client-js";
import { ensPlugin } from "@web3api/ens-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import React from 'react';

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
    
      <Web3ApiProvider plugins={redirects}>
        <div>
          <h3>Interface Implementations</h3>
        </div>

        <VersionRegistryComponent />
        
        <ImplementationRegistryComponent />
        
        <ImplementationsComponent />    
      </Web3ApiProvider>
      
    </div>
  );
}

export default App;
