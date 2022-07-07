import { PolywrapClient, defaultIpfsProviders } from "@polywrap/client-js";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js";

export default new PolywrapClient({
  plugins: [
    {
      uri: "w3://ens/ipfs.web3api.eth",
      plugin: ipfsPlugin({
        provider: defaultIpfsProviders[0],
        fallbackProviders: defaultIpfsProviders.slice(1),
      }),
    }
  ]
});
