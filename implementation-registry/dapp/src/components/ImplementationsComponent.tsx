import './ImplementationsComponent.scss';
import React, { useEffect, useState } from 'react';
import { Web3ApiProvider, useWeb3ApiClient, createWeb3ApiProvider } from "@web3api/react";
import { getImplementations } from '../web3api/implementationRegistry';
import { speak } from '../web3api/testInterface';
import Loader from "react-loader-spinner";

export default function ImplementationsComponent() {
  const client = useWeb3ApiClient();
  
  const [areImplementationsLoading, setAreImplementationsLoading] = useState(false);
  const [interfaceUri, setInterfaceUri] = useState('polyinterface.eth');
  const [implementationsList, setImplementationsList] = useState<string[]>([]);

  const implementationElements = implementationsList.map((implementation, i) =>
    <div key={i} className="card">
      <div>{implementation}</div>
      <div>
        <button 
          onClick={async () =>
            speak(
              implementation,
              client!
            ).then((result) => {
              console.log(result);
            }).catch(err => {
              console.error(err);
            })
          }>
          Speak
        </button>
      </div>
    </div>
  );

  const implementations = areImplementationsLoading 
    ? (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={50}
        width={50}
      />
    )
    : implementationElements;

  return (
    <div className="ImplementationsComponent">
      <div>
        <h4 className="component-title">Find Implementations</h4>
      </div>
      
      <div>
        <input 
          type="text"
          value={interfaceUri}
          onChange={e => setInterfaceUri(e.target.value)}
        />

        <button onClick={async () => {
            setAreImplementationsLoading(true);
        
            getImplementations(
              interfaceUri,
              client
            ).then((result) => {
              setImplementationsList(result);
            }).catch(err =>
              console.error(err)
            ).finally(() => {
              setAreImplementationsLoading(false);
            })
          }
          }>
            Find implementations
        </button>
      </div>

      <div className="implementations">
        {implementations}
      </div>

      <div>
        <button onClick={async () =>
            {
              for(const implementation of implementationsList) {
                speak(
                  implementation,
                  client
                ).then((result) => {
                  console.log(result);
                }).catch(err =>
                  console.error(err)
                )
              }
            }
          }>
            All speak
        </button>
      </div>
    </div>
  );
};
