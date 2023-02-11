import { ClientConfigBuilder } from '@polywrap/client-config-builder-js';
import { PolywrapClient } from '@polywrap/client-js';
import { ethereumPlugin, Connections, Connection } from '@polywrap/ethereum-plugin-js';

export async function setupPolywrapClient(): Promise<PolywrapClient> {
  const ethereum = (window as any).ethereum;
  if (ethereum) {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    throw Error('Please install Metamask.');
  }

  const connections = new Connections({
    networks: {
      goerli: new Connection({
        provider: ethereum,
      })
    },
    defaultNetwork: 'goerli',
  });

  const builder = new ClientConfigBuilder();
  const config = builder.addDefaults().addPlugin("ens/ethereum.polywrap.eth", ethereumPlugin({ connections })).build();
  return new PolywrapClient(config, { noDefaults: true });
}
