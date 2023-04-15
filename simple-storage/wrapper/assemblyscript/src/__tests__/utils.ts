import { ethereumProviderPlugin, ProviderConfig, Connections, Connection } from "@polywrap/ethereum-provider-js";
import { ClientConfigBuilder, DefaultBundle } from '@polywrap/client-config-builder-js';
import {CoreClientConfig, ExtendableUriResolver, IWrapPackage} from "@polywrap/client-js";
import {ETH_ENS_IPFS_MODULE_CONSTANTS} from "polywrap";

export function getConfig(): CoreClientConfig {
  const ethereumConfig: ProviderConfig = {
    connections: new Connections({
      networks: {
        testnet: new Connection({
          provider: ETH_ENS_IPFS_MODULE_CONSTANTS.ethereumProvider // Ganache test network,
        }),
      },
      defaultNetwork: "testnet",
    }),
  };

  return new ClientConfigBuilder()
    .addDefaults()
    .addPackage(
      DefaultBundle.plugins.ethereumProviderV2.uri.uri,
      ethereumProviderPlugin(ethereumConfig) as IWrapPackage
    )
    .addEnv(DefaultBundle.embeds.ipfsResolver.source.uri, {
      provider: ETH_ENS_IPFS_MODULE_CONSTANTS.ipfsProvider,
      fallbackProviders: DefaultBundle.ipfsProviders,
      retries: { tryResolveUri: 2, getFile: 2 },
    })
    .addEnv("proxy/testnet-ens-uri-resolver-ext", {
      registryAddress: ETH_ENS_IPFS_MODULE_CONSTANTS.ensAddresses.ensAddress,
    })
    .addRedirect(
      "proxy/testnet-ens-uri-resolver-ext",
      "ens/wraps.eth:ens-uri-resolver-ext@1.0.1"
    )
    .addInterfaceImplementation(
      ExtendableUriResolver.defaultExtInterfaceUris[0].uri,
      "proxy/testnet-ens-uri-resolver-ext"
    )
    .build();
}