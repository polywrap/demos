import React from 'react';
import { Web3ApiProvider } from '@web3api/react';
import { Header } from './components/Header/Header';
import './App.css';
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "./theme";
import {Main} from "./pages/Main";

export const App: React.FC = () => {
  return (
    <Web3ApiProvider>
      <ThemeProvider theme={darkTheme}>
        <div className="root">
          <Header />
          <Main />
        </div>
      </ThemeProvider>
    </Web3ApiProvider>
  );
};
