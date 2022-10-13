import { PolywrapClient } from "@polywrap/client-js";
import {
  initTestEnvironment,
  stopTestEnvironment,
  providers,
  ensAddresses
} from "@polywrap/test-env-js";
import * as App from "../types/src/wrap";
import path from "path";

import { getPlugins } from "../utils";

jest.setTimeout(500000);

describe("SimpleStorage", () => {

  let client: PolywrapClient;

  const wrapperPath: string = path.join(
    path.resolve(__dirname),
    "..",
    "..",
    ".."
  );
  const wrapperUri = `fs/${wrapperPath}/build`;

  beforeAll(async () => {
    await initTestEnvironment();

    const config = getPlugins(providers.ethereum, providers.ipfs, ensAddresses.ensAddress);
    client = new PolywrapClient(config);
  });

  afterAll(async () => {
    await stopTestEnvironment();
  });

  const getData = async (contractAddr: string): Promise<number> => {
    const result = await App.SimpleStorage_Module.getData(
     {
       address: contractAddr,
     },
     client,
     wrapperUri
    );

    if (!result.ok) fail(result.error);
    expect(result.value).not.toBeNull();

    return result.value as number;
  }

  const setData = async (contractAddr: string, value: number): Promise<string> => {
    const result = await App.SimpleStorage_Module.setData(
     {
       address: contractAddr,
       value,
     },
     client,
     wrapperUri
    );

    if (!result.ok) fail(result.error);
    expect(result.value).not.toBeNull();

    return result.value as string;
  }

  it("sanity", async () => {
    // Deploy contract
    const result = await App.SimpleStorage_Module.deployContract(
     { },
     client,
     wrapperUri
    );

    if (!result.ok) fail(result.error);
    expect(result.value).not.toBeNull();

    const contractAddress = result.value as string;

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
