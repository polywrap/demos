import { ClientConfig, PolywrapClientConfig } from "@polywrap/client-js";
import { ensResolverPlugin } from "@polywrap/ens-resolver-plugin-js";
import { ethereumPlugin, Connections, Connection } from "@polywrap/ethereum-plugin-js";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js";
import { providers, ensAddresses } from "@polywrap/test-env-js";

function getPlugins(): ClientConfig["plugins"] {
  const connection = new Connection({ provider: providers.ethereum })
  const connections = new Connections({ networks: { testnet: connection }, defaultNetwork: "testnet" });
  return [
      {
        uri: "wrap://ens/ipfs.polywrap.eth",
        plugin: ipfsPlugin({}),
      },
      {
        uri: "wrap://ens/ens-resolver.polywrap.eth",
        plugin: ensResolverPlugin({ addresses: { testnet: ensAddresses.ensAddress } }),
      },
      {
        uri: "wrap://ens/ethereum.polywrap.eth",
        plugin: ethereumPlugin({ connections }),
      },
    ];
}

export async function getClientConfig(
  _: Partial<PolywrapClientConfig>
): Promise<Partial<PolywrapClientConfig>> {
  return {
    envs: [{
      uri: "wrap://ens/ipfs.polywrap.eth",
      env: {
        provider: providers.ipfs
      }
    }],
    plugins: getPlugins()
  }
}
