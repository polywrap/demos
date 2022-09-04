import type { Component } from 'solid-js';
import styles from './style.css';

export const Header: Component = () => {
  return (
    <div class={styles.header}>
      <a
        class={styles.header__link}
        href="https://github.com/Web3-API/demos/tree/main/hello-world/web3api"
        target="_blank"
      >
        Source Code
      </a>
      <a
        class={styles.header__link}
        href="https://app.ens.domains/name/helloworld.web3api.eth"
        target="_blank"
      >
        ENS Domain
      </a>
      <a
        class={styles.header__link}
        href="https://bafybeig7r7vm6vg7fkv4u57p6pj3t3a7li56zeiiu6nn7sx5lrlacy7lpi.ipfs.dweb.link/"
        target="_blank"
      >
        IPFS Package
      </a>
    </div>
  );
};
