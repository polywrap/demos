import { useWeb3ApiClient } from '@web3api/react';
import React, { useEffect, useState } from 'react';
import { registerImplementation } from '../web3api/implementationRegistry';
import { useToasts } from 'react-toast-notifications';

export default function ImplementationRegistryComponent() {
  const client = useWeb3ApiClient();
  const { addToast, removeToast } = useToasts();

  const [interfaceToRegister, setInterfaceToRegister] = useState('');
  const [implementationToRegister, setImplementationToRegister] = useState('');

  // const implementations = areImplementationsLoading 
  //   ? (
  //     <Loader
  //       type="TailSpin"
  //       color="#00BFFF"
  //       height={50}
  //       width={50}
  //     />
  //   )
  //   : implementationElements;

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

        <button onClick={async () => {
            addToast('Waiting for transaction to complete...', { appearance: 'info', id: 'registerImplementation', autoDismiss: false });
            
            registerImplementation(
              interfaceToRegister,
              implementationToRegister,
              client!
            ).then(() => {
              addToast(`Registered ${implementationToRegister} as implementation of ${interfaceToRegister}.`, { appearance: 'success', autoDismiss: true });
            }).catch((err: any)=>
              console.error(err)
            ).finally(() => {
              removeToast('registerImplementation');
            })
          }
          }>
            Register API implementation
        </button>
      </div>
    </div>
  );
};
