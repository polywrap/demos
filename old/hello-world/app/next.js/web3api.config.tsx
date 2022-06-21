import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { PluginRegistration } from '@web3api/client-js';
import { Web3ApiProvider } from '@web3api/react';
import { ethereumPlugin, EthereumConfig } from '@web3api/ethereum-plugin-js';

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

const defaultEthConfig: EthereumConfig = {
  networks: {
    mainnet: {
      provider:
        process.env.ETH_PROVIDER ||
        'https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6',
    },
  },
  defaultNetwork: 'mainnet',
};

export const Uris = {
  helloWorld: 'ens/helloworld.web3api.eth',
  anotherUri: '',
};

export default function Web3ApiManager({
  children,
}: {
  children: JSX.Element;
}) {
  const { library, chainId, account } = useWeb3React();

  const [ethPlugin, setEthPlugin] = useState(ethereumPlugin(defaultEthConfig));

  const plugins: PluginRegistration[] = [
    {
      uri: 'ens/ethereum.web3api.eth',
      plugin: ethPlugin,
    },
  ];

  useEffect(() => {
    if (chainId && library) {
      const id = chainId.toString();
      const currentNetwork = networks[id];

      if (!currentNetwork) {
        setEthPlugin(ethereumPlugin(defaultEthConfig));
        return;
      }

      const networkConfigs = {
        [currentNetwork.name]: {
          provider: library,
          signer: library.getSigner(),
        },
      };

      setEthPlugin(
        ethereumPlugin({
          networks: networkConfigs,
          defaultNetwork: currentNetwork.name,
        })
      );
    }
  }, [library, chainId, account]);

  return <Web3ApiProvider plugins={plugins}>{children}</Web3ApiProvider>;
}
