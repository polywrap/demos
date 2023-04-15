import './App.css';
import React from 'react';
import { PolywrapClient } from '@polywrap/client-js';
import { setupPolywrapClient } from './wrapper/setupClient';
import { setData, deployContract } from './wrapper/simplestorage';
import Logo from './logo.png';

interface Set {
  txReceipt: string;
  value: number;
}

function App() {
  const [client, setClient] = React.useState<PolywrapClient | undefined>(
    undefined
  );
  const [contract, setContract] = React.useState<string | undefined>(undefined);
  const [value, setValue] = React.useState<number>(0);
  const [sets, setSets] = React.useState<Set[]>([]);
  const addSet = (set: Set) => setSets([...sets, set]);

  const [inputValue, setInputValue] = React.useState<number>(0);

  const getClient = async () => {
    if (client) {
      return client;
    }

    const newClient = await setupPolywrapClient();
    setClient(newClient);
    return newClient;
  };

  const tab = () => <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

  const link = (url: string, children: () => JSX.Element) => (
    <a target='_blank' rel='noopener noreferrer' href={url}>
      {children()}
    </a>
  );

  const emoji = (symbol: string) => (
    <span role='img' aria-label={symbol}>
      {symbol}
    </span>
  );

  const codeSyntax = (type: string) => (children: () => JSX.Element) =>
    <text className={type}>{children()}</text>;

  const syntax = {
    class: codeSyntax('Code-Class'),
    prop: codeSyntax('Code-Prop'),
    value: codeSyntax('Code-Value'),
    string: codeSyntax('Code-String'),
    variable: codeSyntax('Code-Variable'),
  };

  return (
    <div className='App'>
      {link('https://polywrap.io/', () => (
        <img src={Logo} className='App-logo' />
      ))}
      <header className='App-body'>
        Pre-Alpha
        <h3 className='App-title'>
          Polywrap Demo:
          <br />
          {link('https://app.ens.domains/name/api.simplestorage.eth', () => (
            <>api.simplestorage.eth</>
          ))}
          {link(
            'https://bafybeihsk2ivvcrye7bqtdukxjtmfevfxgidebqqopoqdfpucbgzyy2edu.ipfs.dweb.link/',
            () => (
              <> -&gt; IPFS</>
            )
          )}
        </h3>
        <br />
        <br />
        {!contract ? (
          <>
            Let's get started...
            <br />
            <br />
            {emoji('🔌')} Set Metamask to Rinkeby
            <br />
            <button
              className='App-btn'
              onClick={async () =>
                deployContract(await getClient())
                  .then((address) => setContract(address))
                  .catch((err) => console.error(err))
              }
            >
              {emoji('🚀')} Deploy SimpleStorage.sol
            </button>
            <div className='Code-Block'>
              {syntax.class(() => (
                <>Client</>
              ))}
              .
              {syntax.prop(() => (
                <>query</>
              ))}
              {'({'}
              <br />
              {syntax.value(() => (
                <>&nbsp;&nbsp;&nbsp;&nbsp;uri: </>
              ))}
              {syntax.string(() => (
                <>"ens/rinkeby/api.simplestorage.eth"</>
              ))}
              ,<br />
              {syntax.value(() => (
                <>&nbsp;&nbsp;&nbsp;&nbsp;query: </>
              ))}
              {syntax.string(() => (
                <>{'`mutation {'}</>
              ))}
              <br />
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {'deployContract('}
                </>
              ))}
              <br />
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {tab()}
                  {'connection: {'}
                  <br />
                  {syntax.string(() => (
                    <>
                      {tab()}
                      {tab()}
                      {tab()}
                      {tab()}
                      {'networkNameOrChainId: '}
                      {syntax.variable(() => (
                        <>{'"rinkeby"'}</>
                      ))}
                      <br />
                      {tab()}
                      {tab()}
                      {tab()}
                      {'}'}
                      <br />
                    </>
                  ))}
                </>
              ))}
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {')'}
                </>
              ))}
              <br />
              {syntax.string(() => (
                <>
                  {tab()}
                  {'}`'}
                </>
              ))}
              <br />
              {'})'}
            </div>
            <br />
          </>
        ) : (
          <>
            <p>
              {emoji('✔️')} Deployed SimpleStorage (
              {link(`https://rinkeby.etherscan.io/address/${contract}`, () => (
                <>{contract.substr(0, 7)}...</>
              ))}
              )
            </p>
            <br />
          </>
        )}
        {contract && (
          <>
            Storage Value: {value}
            <br />
            <input
              type='number'
              min='0'
              value={inputValue}
              style={{ width: '75px' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(Number(e.target.value))
              }
            />
            <button
              onClick={async () =>
                setData(contract as string, inputValue, await getClient())
                  .then((result) => {
                    addSet({
                      txReceipt: result,
                      value: inputValue,
                    });
                    setValue(inputValue);
                  })
                  .catch((err) => console.error(err))
              }
            >
              {emoji('📝')} Set Value
            </button>
            <div className='Code-Block'>
              {syntax.class(() => (
                <>Client</>
              ))}
              .
              {syntax.prop(() => (
                <>query</>
              ))}
              {'({'}
              <br />
              {syntax.value(() => (
                <>{tab()}uri: </>
              ))}
              {syntax.string(() => (
                <>"w3://ens/rinkeby/api.simplestorage.eth"</>
              ))}
              ,<br />
              {syntax.value(() => (
                <>{tab()}query: </>
              ))}
              {syntax.string(() => (
                <>{'`mutation {'}</>
              ))}
              <br />
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {'setData('}
                </>
              ))}
              <br />
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {tab()}
                  {'address: '}
                  {syntax.variable(() => (
                    <>"{contract.substr(0, 7)}..."</>
                  ))}
                </>
              ))}
              <br />
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {tab()}
                  {'value: '}
                  {syntax.variable(() => (
                    <>{inputValue}</>
                  ))}
                  <br />
                </>
              ))}
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {tab()}
                  {'connection: {'}
                  <br />
                  {syntax.string(() => (
                    <>
                      {tab()}
                      {tab()}
                      {tab()}
                      {tab()}
                      {'networkNameOrChainId: '}
                      {syntax.variable(() => (
                        <>{'"rinkeby"'}</>
                      ))}
                      <br />
                      {tab()}
                      {tab()}
                      {tab()}
                      {'}'}
                      <br />
                    </>
                  ))}
                </>
              ))}
              {syntax.string(() => (
                <>
                  {tab()}
                  {tab()}
                  {')'}
                </>
              ))}
              <br />
              {syntax.string(() => (
                <>
                  {tab()}
                  {'}`'}
                </>
              ))}
              <br />
              {'})'}
            </div>
            <p>
              {sets.length ? (
                <>
                  Storage History:
                  <br />
                </>
              ) : (
                <></>
              )}
              {sets
                .map((set, index) => (
                  <>
                    #{index} | value: {set.value} | tx:{' '}
                    {link(
                      `https://rinkeby.etherscan.io/tx/${set.txReceipt}`,
                      () => (
                        <>{set.txReceipt.substr(0, 7)}...</>
                      )
                    )}
                    <br />
                  </>
                ))
                .reverse()}
            </p>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
