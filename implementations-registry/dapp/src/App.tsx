import React, { useEffect, useState } from 'react';
import './App.css';
import { Web3ApiClient } from '@web3api/client-js';
import { setupWeb3ApiClient } from './web3api/setupClient';
import { getImplementations } from './web3api/implementationsRegistry';
import { speak } from './web3api/testInterface';

function App() {
  const [interfaceUri, setInterfaceUri] = useState('polyinterface.eth');
  const [client, setClient] = React.useState<Web3ApiClient | undefined>(undefined);
  const [implementationsList, setImplementationsList] = useState<string[]>([
    'test1.eth',
    'test2.eth'
  ]);

  const getClient = async () => {
    if (client) {
      return client;
    }

    const newClient = await setupWeb3ApiClient();
    setClient(newClient);
    console.log(newClient);

    return newClient;
  }

  useEffect(() => {
    (async () => {
      await getClient();
    })();
  }, []);
  
  const implementationElements = implementationsList.map((implementation, i) =>
    <div key={i}>
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
    <div className="App">
      <header className="App-header">
        <div>
          <input 
            type="text"
            value={interfaceUri}
            onChange={e => setInterfaceUri(e.target.value)}
          />

          <button onClick={async () =>
              getImplementations(
                interfaceUri,
                client!
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
                    client!
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
      </header>
    </div>
  );
}

export default App;
