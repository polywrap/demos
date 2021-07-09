import React, { useEffect, useState } from 'react';
import { Web3ApiProvider, useWeb3ApiClient, createWeb3ApiProvider } from "@web3api/react";
import { getImplementations } from '../web3api/implementationRegistry';
import { speak } from '../web3api/testInterface';

export default function ImplementationsComponent() {
  const client = useWeb3ApiClient();
  
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
            }).catch(err =>
              console.error(err)
            )
          }>
          Speak
        </button>
      </div>
    </div>
  );

  return (
    <div className="ImplementationsComponent">
      <div>
        <input 
          type="text"
          value={interfaceUri}
          onChange={e => setInterfaceUri(e.target.value)}
        />

        <button onClick={async () =>
            getImplementations(
              interfaceUri,
              client
            ).then((result) => {
              setImplementationsList(result);
            }).catch(err =>
              console.error(err)
            )
          }>
            Find implementations
        </button>
      </div>

      <div>
        {implementationElements}
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
