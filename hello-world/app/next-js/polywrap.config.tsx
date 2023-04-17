import {useEffect, useRef} from 'react';
import { useWeb3React } from '@web3-react/core';
import { PolywrapProvider } from '@polywrap/react';
import {Connection, Connections, ethereumProviderPlugin} from "@polywrap/ethereum-provider-js";
import {ClientConfigBuilder} from "@polywrap/client-js";

const networks: Record<
  string,
  {
    chainId: number;
    name: string;
    node: string;
    explorer: string;
  }
> = {
  '1': {
    chainId: 1,
    name: 'mainnet',
    node: process.env.MAINNET_URL || '',
    explorer: 'https://etherscan.io',
  },
  '3': {
    chainId: 3,
    name: 'ropsten',
    node: process.env.ROPSTEN_URL || '',
    explorer: 'https://ropsten.etherscan.io',
  },
  '4': {
    chainId: 4,
    name: 'rinkeby',
    node: process.env.RINKEBY_URL || '',
    explorer: 'https://rinkeby.etherscan.io',
  },
};

const defaultConnection = new Connection({
  provider: process.env.ETH_PROVIDER ||
    'https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6'
});

export const Uris = {
  helloWorld: 'ens/helloworld.polytest.eth',
  anotherUri: '',
};

export default function Web3ApiManager({
  children,
}: {
  children: JSX.Element;
}) {
  const { library, chainId, account } = useWeb3React();

  const connections = useRef(new Connections({
    networks: {
      mainnet: defaultConnection,
    },
    defaultNetwork: "mainnet"
  }));

  useEffect(() => {
    if (chainId && library) {
      const id = chainId.toString();
      const currentNetwork = networks[id];

      if (!currentNetwork) {
        connections.current.setDefaultNetwork("mainnet", defaultConnection)
        return;
      }

      connections.current.setDefaultNetwork(
        currentNetwork.name,
        new Connection({
          provider: library,
          signer: library.getSigner(),
        })
      );
    }
  }, [library, chainId, account]);

  const packages = new ClientConfigBuilder().addPackage(
      "plugin/ethereum-provider@2.0.0",
      ethereumProviderPlugin({
        connections: connections.current
      })
    ).config.packages;

  return <PolywrapProvider packages={packages}>{children}</PolywrapProvider>;
}
