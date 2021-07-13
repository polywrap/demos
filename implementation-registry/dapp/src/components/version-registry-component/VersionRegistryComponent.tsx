import "./VersionRegistryComponent.scss";
import { useWeb3ApiClient } from '@web3api/react';
import React, { useState } from 'react';
import { registerAPI } from '../../web3api/versionRegistry';
import { useToasts } from 'react-toast-notifications';

export default function VersionRegistryComponent() {
  const client = useWeb3ApiClient();
  const { addToast, removeToast } = useToasts();
  
  const [apiToRegister, setApiToRegister] = useState('');

  return (
    <div className="VersionRegistryComponent widget">
      <div>
        <h4 className="component-title">Version Registry</h4>
      </div>

      <div>
        <input 
            type="text"
            value={apiToRegister}
            placeholder="ENS domain..."
            onChange={e => setApiToRegister(e.target.value)}
          />

        <button className="register-api" onClick={async () => {
            addToast('Waiting for transaction to complete...', { appearance: 'info', id: 'registerAPI', autoDismiss: false });
            
            registerAPI(
              apiToRegister,
              client!
            ).then(() => {
              console.log(`Registered ${apiToRegister}`);
            }).catch((errors: { message: string}[]) => {
              for(const error of errors) {
                if(error.message.includes('API is already registered')) {
                  addToast('API is already registered', { appearance: 'error', autoDismiss: true })
                } else if(error.message.includes('Resolver not set')) {
                  addToast('ENS Resolver not set', { appearance: 'error', autoDismiss: true })
                } else {
                  addToast(error.message, { appearance: 'error', autoDismiss: true })
                }
              }
            }).finally(() => {
              removeToast('registerAPI');
            });
          }
          }>
            Register API
        </button>
      </div>
    </div>
  );
};
