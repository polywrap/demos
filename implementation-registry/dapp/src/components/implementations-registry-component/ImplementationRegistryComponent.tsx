import "./ImplementationRegistryComponent.scss";
import { useWeb3ApiClient } from '@web3api/react';
import React, { useEffect, useState } from 'react';
import { registerImplementation } from '../../web3api/implementationRegistry';
import { useToasts } from 'react-toast-notifications';

export default function ImplementationRegistryComponent() {
  const client = useWeb3ApiClient();
  const { addToast, removeToast } = useToasts();

  const [interfaceToRegister, setInterfaceToRegister] = useState('');
  const [implementationToRegister, setImplementationToRegister] = useState('');

  return (
    <div className="ImplementationRegistryComponent widget">
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
            className="implementation-domain"
            value={implementationToRegister}
            placeholder="Implementation domain..."
            onChange={e => setImplementationToRegister(e.target.value)}
          />

        <button className="register-implementation" onClick={async () => {
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
            });
          }
          }>
            Register implementation
        </button>
      </div>
    </div>
  );
};
