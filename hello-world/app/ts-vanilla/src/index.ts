import { HelloWorld_Module } from "./wrap";
import { PolywrapClient } from "@polywrap/client-js";
import Toastify from "toastify-js";

const client = new PolywrapClient();

const invokeClient = async () => {
  const input: HTMLInputElement = document.getElementById(
    "message_input"
  ) as HTMLInputElement;
  const message = input.value;
  console.info("Invoking Method: logMessage");
  try {
    const result = await HelloWorld_Module.logMessage({ message }, client);
    console.info(`Invoke Result: ${JSON.stringify(result, null, 2)}`);
  } catch (error) {
    console.log({ error });
  }
};

const executeInvoke = async () => {
  Toastify({
    text: "Take a look at your console!",
    style: {
      fontSize: "20px",
      fontWeight: "500",
      color: "white",
      background: "#60c093",
    },
  }).showToast();

  await invokeClient();
};

const button: HTMLButtonElement = document.getElementById(
  "invoke_button"
) as HTMLButtonElement;
button?.addEventListener("click", executeInvoke);
