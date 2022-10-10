import { ClientConfig, PolywrapClientConfig } from "@polywrap/client-js";
import { ensResolverPlugin } from "@polywrap/ens-resolver-plugin-js";
import { Connection, Connections, ethereumPlugin } from "@polywrap/ethereum-plugin-js";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js";
import { providers, ensAddresses } from "@polywrap/test-env-js";

interface TestEnvironment {
  ipfs: string;
  ethereum: string;
  ensAddress: string;
  registrarAddress?: string;
  reverseAddress?: string;
  resolverAddress?: string;
}

async function getProviders(): Promise<TestEnvironment> {
  const ipfs = providers.ipfs;
  const ethereum = providers.ethereum;
  const ensAddress = ensAddresses.ensAddress;

  return { ipfs, ethereum, ensAddress };
}

function getPlugins(
  ethereum: string,
  ipfs: string,
  ensAddress: string
): Partial<ClientConfig> {
  return {
    plugins: [
      {
        uri: "wrap://ens/ipfs.polywrap.eth",
        plugin: ipfsPlugin({ }),
      },
      {
        uri: "wrap://ens/ens-resolver.polywrap.eth",
        plugin: ensResolverPlugin({ addresses: { testnet: ensAddress } }),
      },
            {
        uri: "wrap://ens/ethereum.polywrap.eth",
        plugin: ethereumPlugin({
          connections: new Connections({
                  networks: {
                          testnet: new Connection({ provider: ethereum })
                  },
                  defaultNetwork: "testnet",
          }),
        }),
    ]
  };
}

export async function getClientConfig(
  _: Partial<PolywrapClientConfig>
): Promise<Partial<PolywrapClientConfig>> {
  const { ipfs, ethereum, ensAddress } = await getProviders();
  return getPlugins(ethereum, ipfs, ensAddress);
}
