import { PolywrapClient } from "@polywrap/client-js";
import * as App from "../types/wrap";
import path from "path";

jest.setTimeout(500000);

describe("JSON RPC Wasm Wrapper (Rust)", () => {

  const client: PolywrapClient = new PolywrapClient();

  const wrapperPath: string = path.join(
    path.resolve(__dirname),
    "..",
    "..",
    ".."
  );
  const wrapperUri = `fs/${wrapperPath}/build`;

  it("calls Near RPC -> 'gas_price' method", async () => {
    const result = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      args: {
        url: "https://archival-rpc.testnet.near.org",
        request: {
          method: "gas_price",
          params: "[93019381]",
          id: "1",
        }
      }
    });
    if (!result.ok) throw result.error;
    const data = result.value;

    expect(data!.id).toEqual("1");
    expect(data!.error).toBeFalsy();
    expect(data!.result).toBeTruthy();

    const gas_price = JSON.parse(data!.result!);
    expect(gas_price.gas_price).toEqual("100000000");
  });

  it("calls Near RPC -> 'block' method", async () => {
    const result = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      args: {
        url: "https://archival-rpc.testnet.near.org",
        request: {
          method: "block",
          params: JSON.stringify({ block_id: 93019381 }),
          id: "2",
        }
      }
    });
    if (!result.ok) throw result.error;
    const data = result.value;

    expect(data!.id).toEqual("2");
    expect(data!.error).toBeFalsy();
    expect(data!.result).toBeTruthy();

    const block = JSON.parse(data!.result!);
    expect(block.header.height).toEqual(93019381);
    expect(block.header.gas_price).toEqual("100000000");
  });

  it("calls Ethereum Infura RPC -> 'eth_getBlockTransactionCountByHash' method", async () => {
    const result = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      args: {
        url: "https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6",
        request: {
          method: "eth_getBlockTransactionCountByHash",
          params: JSON.stringify(["0xcb32f0ee739ee5fe6c21263c1e6842e5348530bc72e327b883224d0a14a0bc41"]),
          id: "3",
        }
      }
    });
    if (!result.ok) throw result.error;
    const data = result.value;

    expect(data!.id).toEqual("3");
    expect(data!.error).toBeFalsy();
    expect(data!.result).toBeTruthy();

    expect(data!.result).toEqual("\"0x96\"");
  });

  it("returns RPC error when querying with wrong params", async () => {
    const result = await client.invoke<App.JsonRpc_Response | null>({
      uri: wrapperUri,
      method: "query",
      args: {
        url: "https://rpc.testnet.near.org",
        request: {
          method: "gas_price",
          id: "4",
        }
      }
    });
    if (!result.ok) throw result.error;
    const data = result.value;

    expect(data!.id).toEqual("4");
    expect(data!.result).toBeFalsy();
    expect(data!.error).toBeTruthy();

    expect(data!.error!).toEqual({
      code: -32700,
      message: "Parse error",
      data: "\"Failed parsing args: invalid type: null, expected a tuple of size 1\"",
    });
  });
});
