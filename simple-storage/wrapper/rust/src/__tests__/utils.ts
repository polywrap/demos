import { ClientConfig } from "@polywrap/client-js";
import { ensResolverPlugin } from "@polywrap/ens-resolver-plugin-js";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js";
import { defaultIpfsProviders } from "@polywrap/client-config-builder-js";
import { ethereumPlugin } from "@polywrap/ethereum-provider";

export function getPlugins(
  ethereum: string,
  ipfs: string,
  ensAddress: string,
): Partial<ClientConfig> {
  return {
    envs: [
      {
        uri: "wrap://ens/ipfs.polywrap.eth",
        env: {
          provider: ipfs,
          fallbackProviders: defaultIpfsProviders,
        },
      },
    ],
    redirects: [
      {
        from: "wrap://ens/ethereum-wrapper.polywrap.eth",
        to: "fs/../../../../integrations/protocol/ethereum/wrapper/build",
      },
    ],
    plugins: [
      {
        uri: "wrap://ens/ipfs.polywrap.eth",
        plugin: ipfsPlugin({}),
      },
      {
        uri: "wrap://ens/ens.polywrap.eth",
        plugin: ensResolverPlugin({ addresses: { testnet: ensAddress } }),
      },
      {
        uri: "wrap://ens/ethereum-provider.polywrap.eth",
        plugin: ethereumPlugin({
          url: ethereum,
          wallet: "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d"
        }),
      },
    ],
  };
}
