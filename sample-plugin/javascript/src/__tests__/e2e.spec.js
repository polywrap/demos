require("regenerator-runtime")

const { Web3ApiClient } = require("@web3api/client-js");
const { jsExamplePlugin } = require("../../build");

describe("e2e", () => {

  let client;
  const uri = "ens/sampleplugin.eth";

  beforeAll(() => {
    // Add the samplePlugin to the Web3ApiClient
    client = new Web3ApiClient({
      plugins: [
        {
          uri: uri,
          plugin: jsExamplePlugin({ defaultValue: "foo bar" })
        }
      ]
    });
  });

  it("sampleQuery", async () => {
    const result = await client.query({
      uri,
      query: `query {
        sampleQuery(
          data: "fuz baz "
        )
      }`
    });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.sampleQuery).toBe("fuz baz foo bar");
  });

  it("sampleMutation", async () => {
    const result = await client.query({
      uri,
      query: `mutation {
        sampleMutation(
          data: $data
        )
      }`,
      variables: {
        data: new Uint8Array([1, 2, 3, 4, 5])
      }
    });

    expect(result.errors).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(result.data?.sampleMutation).toBe(true);
  });
});
