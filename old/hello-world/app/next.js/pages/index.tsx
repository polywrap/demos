import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useWeb3ApiQuery } from '@web3api/react';
import { Uris } from '../web3api.config';
import Image from 'next/image';

const Home: NextPage = () => {
  const [message, setMessage] = useState('');

  const query = {
    uri: Uris.helloWorld,
    query: `query { 
        logMessage(
            message: $message
        )
     }`,
    variables: {
      message: message,
    },
  };

  const { execute } = useWeb3ApiQuery(query);

  const logMsgHandler = async (event: any): Promise<any> => {
    setMessage('');
    event.preventDefault();
    console.info(`Sending Query: ${JSON.stringify(query, null, 2)}`);
    const result = await execute();
    console.info(`Query Result: ${JSON.stringify(result, null, 2)}`);
  };

  const onChangeHandler = (event: any): void => {
    setMessage(event?.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Polywrap Next App</title>
        <meta
          name='description'
          content='Polywrap NextJS Typescript template'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Image src='/favicon.ico' width='85' height='85' />
        <h1 className={styles.title}>
          Welcome to <a href='https://polywrap.io'>Polywrap!</a>
        </h1>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={logMsgHandler}>
            <h2>Try the "Hello World" Wrapper</h2>
            <p className={styles.description}>
              We've deployed the wrapper to{' '}
              <a
                href='https://app.ens.domains/name/helloworld.web3api.eth/details'
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className={styles.code}>ens/helloworld.web3api.eth</p>
              </a>
              <br></br>
              <br></br>
              You can use it by submitting any text into the field below and
              looking at your console.
            </p>

            <div className={styles.input__container}>
              <input
                className={styles.input}
                value={message}
                type='text'
                onChange={onChangeHandler}
              />{' '}
              <button className={styles.btn}>Submit</button>
              <br></br>
            </div>
          </form>
          <a href='https://docs.polywrap.io' className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Polywrap features.</p>
          </a>

          <a href='https://github.com/polywrap/demos' className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover other demos of Polywrap.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
