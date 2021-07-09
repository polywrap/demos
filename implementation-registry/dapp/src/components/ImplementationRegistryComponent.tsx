import { useWeb3ApiClient } from '@web3api/react';
import React, { useEffect, useState } from 'react';
import { registerImplementation } from '../web3api/implementationRegistry';

export default function ImplementationRegistryComponent() {
  const client = useWeb3ApiClient();
 
  const [interfaceToRegister, setInterfaceToRegister] = useState('');
  const [implementationToRegister, setImplementationToRegister] = useState('');

  return (
    <div className="ImplementationRegistryComponent">
      <div>
        <h4 className="component-title">Implementation Registry</h4>
      </div>
      
      <div>
        <input 
            type="text"
            value={interfaceToRegister}
            placeholder="Interface domain..."
            onChange={e => setInterfaceToRegister(e.target.value)}
          />
        <input 
            type="text"
            value={implementationToRegister}
            placeholder="Implementation domain..."
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
            Register API implementation
        </button>
      </div>
    </div>
  );
};
