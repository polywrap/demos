import { Ethereum_Module } from "./wrap";
import { PolywrapClient } from "@polywrap/client-js";
import Toastify from "toastify-js";
import { ethereumPlugin } from "@polywrap/ethereum-plugin-js";
import { ethers, providers } from "ethers";

declare let window: {
  ethereum?: {
    chainId: string;
    selectedAddress?: string;
  };
};

let client: PolywrapClient;
document.getElementById("invoke_button").innerText = "Authenticate";

const authenticate = async () => {
  if (!window.ethereum) {
    Toastify({
      text: "You must install MetaMask!",
      style: {
        fontSize: "20px",
        fontWeight: "500",
        color: "white",
        background: "red",
      },
    }).showToast();
    return;
  }

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(
    window.ethereum as providers.ExternalProvider
  );

  // MetaMask requires requesting permission to connect users accounts
  await provider.send("eth_requestAccounts", []);

  if (!client) {
    Toastify({
      text: "Now you can sign your message!",
      style: {
        fontSize: "20px",
        fontWeight: "500",
        color: "white",
        background: "green",
      },
    }).showToast();
  }
  client = new PolywrapClient({
    plugins: [
      {
        uri: "wrap://ens/ethereum.polywrap.eth",
        plugin: ethereumPlugin({
          networks: {
            [window.ethereum.chainId]: {
              provider: provider,
            },
          },
          defaultNetwork: window.ethereum.chainId,
        }),
      },
    ],
  });

  document.getElementById("invoke_button").innerText = "Sign Message";
};

const invokeClient = async () => {
  try {
    if (client) {
      console.log(client);
      console.info("Invoking Method: Ethereum_Module.signMessage");
      const result = await Ethereum_Module.signMessage(
        { message: "Signing message from polywrap" },
        client
      );
      Toastify({
        text: "Message signed!",
        style: {
          fontSize: "20px",
          fontWeight: "500",
          color: "white",
          background: "green",
        },
      }).showToast();
      console.info(`Invoke Result: ${JSON.stringify(result, null, 2)}`);
    }
    await authenticate();
  } catch (error) {
    console.log({ error });
  }
};

const button: HTMLButtonElement = document.getElementById(
  "invoke_button"
) as HTMLButtonElement;
button?.addEventListener("click", invokeClient);
