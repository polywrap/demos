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
    const client = new Web3ApiClient(event.data.client);
    client.invoke(event.data.invoke)
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
