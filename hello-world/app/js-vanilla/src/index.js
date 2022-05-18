import { HelloWorld_Query } from "./w3";
import { Web3ApiClient } from "@web3api/client-js";
import Toastify from "toastify-js";

function invokeClient() {
  const client = new Web3ApiClient();
  const message = document.getElementById("message_input").value;
  const result = HelloWorld_Query.logMessage({ message }, client);
  console.info("Invoking Method: logMessage");
  result
    .then((result) =>
      console.info(`Invoke Result: ${JSON.stringify(result, null, 2)}`)
    )
    .catch((error) => console.log({ error }));
}

document.getElementById("invoke_button").addEventListener("click", function () {
  Toastify({
    text: "Take a look at your console!",
    style: {
      fontSize: "20px",
      fontWeight: "500",
      color: "white",
      background: "#60c093",
    },
  }).showToast();
  invokeClient();
});
