import type { Component } from 'solid-js';
import styles from './style.css';
import {createSignal, useContext} from "solid-js";
import {PolywrapClient} from "@polywrap/client-js";
import {ClientContext} from "../PolywrapProvider";

export const HelloWorld: Component = () => {
  const client: PolywrapClient | undefined = useContext(ClientContext);
  const [message, setMessage] = createSignal<string>('');
  
  const logMsgHandler = async (event: any): Promise<any> => {
    event.preventDefault();
    const invocation = {
      uri: 'ens/helloworld.polytest.eth',
      method: 'logMessage',
      args: {
        message: message()
      }
    };
    console.info(`Sending invoke: ${JSON.stringify(invocation, null, 2)}`);
    const result = await client?.invoke<boolean>(invocation);
    console.info(`Query Result: ${JSON.stringify(result, null, 2)}`);
  };

  const onChangeHandler = (event: any): void => {
    setMessage(event?.target.value);
  };

  return (
    <>
      <div class={styles.hello}>
        <div class={styles.hello__heading}>"Hello World" from Polywrap!</div>
        <div class={styles.hello__text}>
          <strong>Test the "Hello World" Polywrapper by:</strong>
          <br />
          1. typing into the input below
          <br />
          2. clicking the submit button
          <br />
          3. viewing the output in{' '}
          <a
            class={styles.hello__link}
            href='https://webmasters.stackexchange.com/a/77337'
            target='_blank'
          >
            the console
          </a>
          <br />
        </div>
        <br />
        <form
          onSubmit={(event) => logMsgHandler(event)}
          class={styles.hello__form}
        >
          <input
            class={styles.hello__input}
            onChange={(event) => onChangeHandler(event)}
          />
          <button type='submit' class={styles.hello__btn}>
            Submit
          </button>
        </form>
        <div class={styles.hello__text}>
          Want to build your own Polywrapper?
          <br />
          <a
            class={styles.hello__link}
            href='https://docs.polywrap.io/'
            target='_blank'
          >
            Check out our documentation
          </a>
        </div>
      </div>
    </>
  );
};
