import { Web3ApiClient, PluginRegistration } from '@web3api/client-js';
import { ethereumPlugin } from '@web3api/ethereum-plugin-js';

export async function setupWeb3ApiClient(): Promise<Web3ApiClient> {
  const ethereum = (window as any).ethereum;
  if (ethereum) {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    throw Error('Please install Metamask.');
  }

  const plugins: PluginRegistration[] = [
    {
      uri: 'ens/ethereum.web3api.eth',
      plugin: ethereumPlugin({
        networks: {
          rinkeby: {
            provider: ethereum,
          },
        },
      }),
    },
  ];

  return new Web3ApiClient({ plugins });
}
