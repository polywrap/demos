import "./VersionRegistryComponent.scss";
import { useWeb3ApiClient } from '@web3api/react';
import React, { useCallback, useEffect, useState } from 'react';
import * as versionRegistry from '../../web3api/versionRegistry';
import { useToasts } from 'react-toast-notifications';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Loader from "react-loader-spinner";
import useConstant from 'use-constant';

export default function VersionRegistryComponent() {
  const client = useWeb3ApiClient();
  const { addToast, removeToast } = useToasts();
  
  const [apiToRegister, setApiToRegister] = useState('');
  const [isApiRegistered, setIsApiRegistered] = useState<boolean | undefined>();
  const [isApiRegisteredLoading, setIsApiRegisteredLoading] = useState(false);

  const checkIfApiRegisteredDebounced = useConstant(() => {
    const checkIfApiRegistered = async (domain: string) => {
      console.log('1');
      if(!domain || !domain.endsWith('.eth')) {
        setIsApiRegistered(undefined);
        return;
      }
  
      setIsApiRegisteredLoading(true);
  
      versionRegistry.checkIfApiRegistered(domain, client)
        .then((isRegistered) => {
          setIsApiRegistered(isRegistered);
        })
        .finally(() => {
          setIsApiRegisteredLoading(false);
        });
    };

    return AwesomeDebouncePromise(
      checkIfApiRegistered,
      5000
    );
  })
  
  const apiRegisteredInfo = !isApiRegisteredLoading
    ? 
     isApiRegistered !== undefined && apiToRegister
      ? isApiRegistered
        ? <span className="api-registered-message">API is already registered</span>
        : <span className="api-not-registered-message">API is not yet registered</span>
      : <div className="empty-api-registered-container"></div>
    : (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={20}
        width={20}
      />
    );

  return (
    <div className="VersionRegistryComponent widget">
      <div>
        <h4 className="component-title">Version Registry</h4>
      </div>

      <div className="api-to-register">
        <input 
            type="text"
            value={apiToRegister}
            placeholder="ENS domain..."
            onChange={async e => {
              setApiToRegister(e.target.value);
              await checkIfApiRegisteredDebounced!(e.target.value);
            }}
          />

        <button className="register-api" onClick={async () => {
            addToast('Waiting for transaction to complete...', { appearance: 'info', id: 'registerAPI', autoDismiss: false });
            
            versionRegistry.registerAPI(
              apiToRegister,
              client!
            ).then(() => {
              addToast(`Registered ${apiToRegister}`, { appearance: 'success', autoDismiss: true })
            }).catch((errors: { message: string}[]) => {
              for(const error of errors) {
                if(error.message.includes('API is already registered')) {
                  addToast('API is already registered', { appearance: 'error', autoDismiss: true })
                } else if(error.message.includes('Resolver not set')) {
                  addToast('ENS Resolver not set', { appearance: 'error', autoDismiss: true })
                } else if(error.message.includes('execution reverted')) {
                  addToast('RPC Error: execution reverted', { appearance: 'error', autoDismiss: true })
                } else {
                  addToast(error.message, { appearance: 'error', autoDismiss: true })
                }

                console.error(error);
              }
            }).finally(() => {
              removeToast('registerAPI');
            });
          }
          }>
            Register API
        </button>
      </div>
      
      <div>
          {apiRegisteredInfo}
      </div>
    </div>
  );
};
