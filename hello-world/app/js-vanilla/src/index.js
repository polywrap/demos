import { PolywrapClient } from "@polywrap/client-js";
import Toastify from "toastify-js";

const client = new PolywrapClient();

function invokeClient() {
  const message = document.getElementById("message_input").value;
  const result = client.invoke({
    uri: "wrap://ens/goerli/hello.as.demos.wraplib.eth",
    method: "logMessage",
    args: {
      message
    }
  })
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
