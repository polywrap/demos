import React, { useEffect, useState } from 'react';
import './App.scss';
import { Web3ApiClient } from '@web3api/client-js';
import { setupWeb3ApiClient } from './web3api/setupClient';
import { getImplementations, registerImplementation } from './web3api/implementationRegistry';
import { speak } from './web3api/testInterface';
import { registerAPI } from './web3api/versionRegistry';

function App() {
  const [interfaceUri, setInterfaceUri] = useState('polyinterface.eth');
  const [client, setClient] = React.useState<Web3ApiClient | undefined>(undefined);
  const [implementationsList, setImplementationsList] = useState<string[]>([
    'test1.eth',
    'test2.eth'
  ]);

  const [apiToRegister, setApiToRegister] = useState('');

  const [interfaceToRegister, setInterfaceToRegister] = useState('');
  const [implementationToRegister, setImplementationToRegister] = useState('');


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
    <div className="App">
      <div>
        <input 
            type="text"
            value={apiToRegister}
            onChange={e => setApiToRegister(e.target.value)}
          />

        <button onClick={async () =>
            registerAPI(
              apiToRegister,
              client!
            ).then(() => {
              console.log(`Registered ${apiToRegister}`);
            }).catch(err =>
              console.error(err)
            )
          }>
            Register API
        </button>
      </div>

      <div>
        <input 
            type="text"
            value={interfaceToRegister}
            onChange={e => setInterfaceToRegister(e.target.value)}
          />
        <input 
            type="text"
            value={implementationToRegister}
            onChange={e => setImplementationToRegister(e.target.value)}
          />

        <button onClick={async () =>
            registerImplementation(
              interfaceToRegister,
              implementationToRegister,
              client!
            ).then(() => {
              console.log(`Registered ${implementationToRegister} as implementation of ${interfaceToRegister}.`);
            }).catch((err: any)=>
              console.error(err)
            )
          }>
            Register implementation
        </button>
      </div>
     
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
    </div>
  );
}

export default App;
