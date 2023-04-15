import { PolywrapClient } from "@polywrap/client-js";
import { Commands } from '@polywrap/cli-js';
import path from "path";

import { getConfig } from "../utils";

jest.setTimeout(500000);

describe("SimpleStorage", () => {
  const CONNECTION = { networkNameOrChainId: "testnet" };

  let client: PolywrapClient;

  const wrapperPath: string = path.join(
    path.resolve(__dirname),
    "..",
    "..",
    ".."
  );
  const wrapperUri = `fs/${wrapperPath}/build`;

  beforeAll(async () => {
    await Commands.infra("up", {
      modules: ["eth-ens-ipfs"],
    });

    client = new PolywrapClient(getConfig());
  });

  afterAll(async () => {
    await Commands.infra("down", {
      modules: ["eth-ens-ipfs"],
    });
  });

  const getData = async (contractAddr: string): Promise<number> => {
    const response = await client.invoke<number>({
      uri: wrapperUri,
      method: "getData",
      args: {
        address: contractAddr,
        connection: CONNECTION,
      }
    });

    if (!response.ok) throw response.error;
    return response.value
  }

  const setData = async (contractAddr: string, value: number): Promise<string> => {
    const response = await client.invoke<string>({
      uri: wrapperUri,
      method: "setData",
      args: {
        address: contractAddr,
        connection: CONNECTION,
        value: value,
      },
    });

    if (!response.ok) throw response.error;
    return response.value
  }

  it("sanity", async () => {
    // Deploy contract
    const deployContractResponse = await client.invoke<string>({
      uri: wrapperUri,
      method: "deployContract",
      args: { connection: CONNECTION },
    });
    if (!deployContractResponse.ok) throw deployContractResponse.error;
    const contractAddress = deployContractResponse.value;

    // Get data
    let data = await getData(contractAddress);
    expect(data).toBe(0);

    // Set data
    const tx = await setData(contractAddress, 10);
    expect(tx).toBeTruthy();

    // Get data
    data = await getData(contractAddress);
    expect(data).toBe(10);
  });
});
