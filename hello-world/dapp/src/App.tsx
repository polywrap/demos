import React from "react";
import Lottie from "react-lottie";
import { Web3ApiProvider } from "@web3api/react";

import { HelloWorld } from "./HelloWorld";
import Web3ApiAnimation from "./lottie/Web3API_Icon_Cycle.json";
import "./App.css";

export const App: React.FC = () => {

  const logoLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: Web3ApiAnimation,
  };

  return (
    <div className="main">
      <div className="header__container">
        <a
          className="header__link"
          href="https://github.com/Web3-API/demos/tree/main/hello-world/web3api"
          target="_blank"
        >
          Source Code
        </a>
        <a
          className="header__link"
          href="https://app.ens.domains/name/helloworld.web3api.eth"
          target="_blank"
        >
          ENS Domain
        </a>
        <a
          className="header__link"
          href="https://bafybeig7r7vm6vg7fkv4u57p6pj3t3a7li56zeiiu6nn7sx5lrlacy7lpi.ipfs.dweb.link/"
          target="_blank"
        >
          IPFS Package
        </a>
      </div>
      <Web3ApiProvider>
        <Lottie
          options={logoLottieOptions}
          isClickToPauseDisabled={true}
          height={"300px"}
          width={"300px"}
          style={{
            width: "50%",
            height: "auto",
            maxWidth: "300px",
            marginTop: "50px"
          }}
        />
        <HelloWorld />
      </Web3ApiProvider>
    </div>
  );
};
