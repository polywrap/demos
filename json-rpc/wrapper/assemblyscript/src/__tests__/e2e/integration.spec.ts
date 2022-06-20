import { PolywrapClient } from "@polywrap/client-js";
import { buildWrapper } from "@polywrap/test-env-js";
import * as App from "../types/wrap";
import path from "path";

jest.setTimeout(500000);

describe("JSON RPC Wasm Wrapper (AssemblyScript)", () => {

  const client: PolywrapClient = new PolywrapClient();

  const wrapperPath: string = path.join(
    path.resolve(__dirname),
    "..",
    "..",
    ".."
  );
  const wrapperUri = `fs/${wrapperPath}/build`;

  beforeAll(async () => {
    await buildWrapper(wrapperPath);
  });

  it("json rpc query without parameters", async () => {
    const { data, error } = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      input: {
        url: "https://rpc.testnet.near.org",
        request: {
          method: "gas_price",
          // params: "[null]",
          id: 1,
        }
      }
    });
    expect(error).toBeFalsy();
    console.log(JSON.stringify(data, null, 2));
  });

  it("json rpc query with parameters", async () => {
    const { data, error } = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      input: {
        url: "https://rpc.testnet.near.org",
        request: {
          method: "gas_price",
          params: "[17824600]",
          id: 1,
        }
      }
    });
    expect(error).toBeFalsy();
    console.log(JSON.stringify(data, null, 2));
  });
});
