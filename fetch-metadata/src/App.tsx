import React from 'react';
import { PolywrapProvider } from '@polywrap/react';
import { Header } from './components/Header/Header';
import './App.css';
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "./theme";
import {Main} from "./pages/Main";

export const App: React.FC = () => {
  return (
    <PolywrapProvider>
      <ThemeProvider theme={darkTheme}>
        <div className="root">
          <Header />
          <Main />
        </div>
      </ThemeProvider>
    </PolywrapProvider>
  );
};
