import { PolywrapClient, defaultIpfsProviders } from "@polywrap/client-js";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js";

export default new PolywrapClient({
  plugins: [
    {
      uri: "wrap://ens/ipfs.polywrap.eth",
      plugin: ipfsPlugin({
        provider: defaultIpfsProviders[0],
        fallbackProviders: defaultIpfsProviders.slice(1),
      }),
    }
  ]
});
