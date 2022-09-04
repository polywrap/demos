import type { Component } from 'solid-js';

import Logo from './assets/logo.png';
import styles from './App.module.css';
import {Header, HelloWorld, PolywrapProvider } from "./components";

const App: Component = () => {
  return (
    <PolywrapProvider>
      <Header />
      <div class={styles.main}>
        <img src={Logo} class={styles.main__logo} />
        <HelloWorld />
      </div>
    </PolywrapProvider>
  );
};

export default App;
