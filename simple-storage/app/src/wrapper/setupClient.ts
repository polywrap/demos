import {
  PolywrapClient,
  ClientConfigBuilder,
  DefaultBundle,
  IWrapPackage
} from '@polywrap/client-js';
import { ethereumProviderPlugin, Connections, Connection } from '@polywrap/ethereum-provider-js';

export async function setupPolywrapClient(): Promise<PolywrapClient> {
  const ethereum = (window as any).ethereum;
  if (ethereum) {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    throw Error('Please install Metamask.');
  }

  const config = new ClientConfigBuilder()
    .addDefaults()
    .addPackage(
      DefaultBundle.plugins.ethereumProviderV2.uri.uri,
      ethereumProviderPlugin({
        connections: new Connections({
          networks: {
            rinkeby: new Connection({
              provider: ethereum
            }),
          },
        }),
      }) as IWrapPackage
    )
    .build()

  return new PolywrapClient(config);
}
