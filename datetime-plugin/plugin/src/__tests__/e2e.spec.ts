import { Web3ApiClient } from "@web3api/client-js";
import { dateTimePlugin } from "../";

describe("e2e", () => {

  let client: Web3ApiClient;
  const uri = "ens/datetime-plugin.eth";

  beforeAll(() => {
    // Add the dateTimePlugin to the Web3ApiClient
    client = new Web3ApiClient({
      plugins: [
        {
          uri: uri,
          plugin: dateTimePlugin({})
        }
      ]
    });
  });

  it("sampleQuery", async () => {
    const result = await client.query({
      uri,
      query: `query {
        currentTime
      }`
    });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.currentTime).toBeTruthy();
    expect(typeof result.data?.currentTime).toBe("string");
  });
});
