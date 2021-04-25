import React from "react";
import Lottie from "react-lottie";
import Web3ApiAnimation from "./lottie/Web3API_Icon_Cycle.json";
import { Web3ApiProvider } from "@web3api/react";
import { HelloWorld } from "./HelloWorld";
import { Header } from "./Header";
import "./App.css";

export const App: React.FC = () => {
  const logoLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: Web3ApiAnimation,
  };

  return (
    <Web3ApiProvider>
      <Header />
      <div className="main">
        <Lottie
          options={logoLottieOptions}
          isClickToPauseDisabled={true}
          height={"350px"}
          width={"350px"}
        />
        <HelloWorld />
      </div>
    </Web3ApiProvider>
  );
};
