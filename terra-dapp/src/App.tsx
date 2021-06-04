import './App.css';
import React from 'react';
import Lottie from "react-lottie";
import { LCDClient, Coin, MsgSend, MnemonicKey } from '@terra-money/terra.js';
import Web3ApiAnimation from "./lottie/Web3API_Icon_Cycle.json";

function App() {
  const [swapCoin, setSwapCoin] = React.useState<string | undefined>(undefined);

// connect to soju testnet
// const terra = new LCDClient({
//   URL: 'https://soju-lcd.terra.dev',
//   chainID: 'soju-0014',
// });

// To use LocalTerra
const terra = new LCDClient({
  URL: 'http://localhost:1317',
  chainID: 'localterra'
});

// get the current swap rate from 1 TerraUSD to TerraKRW
const offerCoin = new Coin('uusd', '1000000');
terra.market.swapRate(offerCoin, 'ukrw').then(c => {
  setSwapCoin(c.toString());
});

// create a key out of a mnemonic
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

  const logoLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: Web3ApiAnimation
  };

// a wallet can be created out of any key
// wallets abstract transaction building
const wallet = terra.wallet(mk);

// create a simple message that moves coin balances
const send = new MsgSend(
  'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
  'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
  { uluna: 1000000, ukrw: 1230201, uusd: 1312029 }
);

wallet
  .createAndSignTx({
    msgs: [send],
    memo: 'test from terra.js!',
  })
  .then(tx => terra.tx.broadcast(tx))
  .then(result => {
    console.log('%cTX hash:', 'color: blue', result.txhash);
  });

  const tab = () => (<>&nbsp;&nbsp;&nbsp;&nbsp;</>);

  const link = (url: string, children: () => JSX.Element) => (
    <a target="_blank" rel="noopener noreferrer" href={url}>
      {children()}
    </a>
  );

  const emoji = (symbol: string) => (
    <span role="img" aria-label={symbol}>
      {symbol}
    </span>
  );


  return (
    <div className="App">
      <header className="App-body">
        {link("https://web3api.dev/", () => (
          <Lottie
            options={logoLottieOptions}
            isClickToPauseDisabled={true}
            height={"100px"}
            width={"100px"}
          />
        ))}
        Pre-Alpha
          <h3>
            Web3API Demo:
            <br/>
            {link("https://app.ens.domains/name/api.simplestorage.eth", () => (
              <>api.simplestorage.eth</>
            ))}
            &nbsp;&nbsp;
            {link("https://bafybeihsk2ivvcrye7bqtdukxjtmfevfxgidebqqopoqdfpucbgzyy2edu.ipfs.dweb.link/", () => (
              <>IPFS</>
            ))}
          </h3>
          <p>{`${offerCoin.toString()} can be swapped for ${swapCoin}`}</p>
          <br/>
          <br/>
      </header>
    </div>
  );
}

export default App;
