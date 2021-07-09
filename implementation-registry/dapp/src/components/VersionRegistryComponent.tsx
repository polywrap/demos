import { useWeb3ApiClient } from '@web3api/react';
import React, { useState } from 'react';
import { registerAPI } from '../web3api/versionRegistry';

export default function VersionRegistryComponent() {
  const client = useWeb3ApiClient();
  
  const [apiToRegister, setApiToRegister] = useState('');

  return (
    <div className="VersionRegistryComponent">
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
            }).catch((err: any) =>
              console.error(err)
            )
          }>
            Register API
        </button>
      </div>
    </div>
  );
};
