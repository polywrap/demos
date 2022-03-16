import { Web3ApiClient, defaultIpfsProviders } from "@web3api/client-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";

export default new Web3ApiClient({
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
