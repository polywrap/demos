import { PolywrapClient } from "@polywrap/client-js";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js"
import Toastify from "toastify-js";

const config = {
  plugins: [{
    uri: "wrap://ens/ipfs.polywrap.eth",
    plugin: ipfsPlugin({
      provider: "http://localhost:5001"
    })
  }]
}
const client = new PolywrapClient(config);

function invokeClient() {
  const message = document.getElementById("message_input").value;
  const result = client.invoke({
    uri: "wrap://ipfs/QmNeSVRrYVDhgoqz1C9VAJTfHgedkk1QY3J6YpSGghgxQk",
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
