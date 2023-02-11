import { PolywrapClient, PluginRegistration } from '@polywrap/client-js';
import { ethereumPlugin } from '@polywrap/ethereum-plugin-js';

export async function setupPolywrapClient(): Promise<PolywrapClient> {
  const ethereum = (window as any).ethereum;
  if (ethereum) {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    throw Error('Please install Metamask.');
  }

  const plugins: PluginRegistration[] = [
    {
      uri: 'ens/ethereum.polywrap.eth',
      plugin: ethereumPlugin({
        networks: {
          goerli: {
            provider: ethereum,
          },
        },
      }),
    },
  ];

  return new PolywrapClient({ plugins });
}
