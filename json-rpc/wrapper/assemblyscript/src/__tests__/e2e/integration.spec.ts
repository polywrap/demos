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

  it("Near protocol RPC -> 'gas_price' method", async () => {
    const { data, error } = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      input: {
        url: "https://archival-rpc.testnet.near.org",
        request: {
          method: "gas_price",
          params: "[93019381]",
          id: "1",
        }
      }
    });
    expect(error).toBeFalsy();
    expect(data).toBeTruthy();

    expect(data!.id).toEqual("1");
    expect(data!.error).toBeFalsy();
    expect(data!.result).toBeTruthy();

    const gas_price = JSON.parse(data!.result!);
    expect(gas_price.gas_price).toEqual("100000000");
  });

  it("Near protocol RPC -> 'block' method", async () => {
    const { data, error } = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      input: {
        url: "https://archival-rpc.testnet.near.org",
        request: {
          method: "block",
          params: JSON.stringify({ block_id: 93019381 }),
          id: "1",
        }
      }
    });
    expect(error).toBeFalsy();
    expect(data).toBeTruthy();

    expect(data!.id).toEqual("1");
    expect(data!.error).toBeFalsy();
    expect(data!.result).toBeTruthy();

    const block = JSON.parse(data!.result!);
    expect(block.header.height).toEqual(93019381);
    expect(block.header.gas_price).toEqual("100000000");
  });

  it("Near protocol RPC -> missing params", async () => {
    const { data, error } = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      input: {
        url: "https://rpc.testnet.near.org",
        request: {
          method: "gas_price",
          id: "1",
        }
      }
    });
    expect(error).toBeFalsy();
    expect(data).toBeTruthy();

    expect(data!.id).toEqual("1");
    expect(data!.result).toBeFalsy();
    expect(data!.error).toBeTruthy();

    expect(data!.error!).toEqual({
      code: -32700,
      message: "Parse error",
      data: "\"Require at least one parameter\""
    });
  });
});
