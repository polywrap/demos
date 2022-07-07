import {
  InvokeEvent,
  HostAction
} from "./messages";

import { PolywrapClient } from "@polywrap/client-js";

const dispatchAction = (action: HostAction) => {
  // @ts-ignore webworker postMessage
  postMessage(action);
};

addEventListener(
  "message",
  (event: { data: InvokeEvent }) => {
    const { invoke, clientModule } = event.data;

    const client = clientModule
      ? require(clientModule).default as PolywrapClient
      : new PolywrapClient();

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
