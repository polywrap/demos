import {
  InvokeEvent,
  HostAction
} from "./messages";

import { Web3ApiClient } from "@web3api/client-js";

const dispatchAction = (action: HostAction) => {
  // @ts-ignore webworker postMessage
  postMessage(action);
};

addEventListener(
  "message",
  (event: { data: InvokeEvent }) => {
    const { invoke, clientModule } = event.data;

    const client = clientModule
      ? require(clientModule).default as Web3ApiClient
      : new Web3ApiClient();

    if (clientModule && (!client || typeof client.invoke !== "function")) {
      dispatchAction({
        type: "InvokeException",
        error: new Error(
          `Unable to load user-configured client module: ${clientModule}`
        )
      });
      return;
    }

    client.invoke(invoke)
      .then((result) => {
        dispatchAction({
          type: "InvokeResult",
          result,
        });
      })
      .catch((error) => {
        dispatchAction({
          type: "InvokeException",
          error,
        });
      });
  }
);
