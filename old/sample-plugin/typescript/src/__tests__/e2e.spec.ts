import { Web3ApiClient } from "@web3api/client-js";
import { tsExamplePlugin } from "../";

describe("e2e", () => {

  let client: Web3ApiClient;
  const uri = "ens/sampleplugin.eth";

  beforeAll(() => {
    // Add the samplePlugin to the Web3ApiClient
    client = new Web3ApiClient({
      plugins: [
        {
          uri,
          plugin: tsExamplePlugin({
            query: { defaultValue: "foo bar" },
            mutation: { defaultValue: "foo bar" }
          })
        }
      ]
    });
  });

  it("sampleQuery", async () => {
    const result = await client.invoke<string>({
      uri,
      module: "query",
      method: "sampleQuery",
      input: {
        data: "fuz baz "
      }
    });

    expect(result.error).toBeFalsy();
    expect(result.data).toBe("fuz baz foo bar");
  });

  it("sampleMutation", async () => {
    const result = await client.invoke<boolean>({
      uri,
      module: "mutation",
      method: "sampleMutation",
      input: {
        data: new Uint8Array([1, 2, 3, 4, 5])
      }
    });

    expect(result.error).toBeFalsy();
    expect(result.data).toBe(true);
  });
});
