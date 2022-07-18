import {
  ThreadPool,
  ClientThread,
  ThreadStatus
} from "..";
import { transpileTypescriptModule } from "./typescript";

jest.setTimeout(360000);

describe("e2e", () => {

  const uniswapV2Uri = 'wrap://ipfs/QmYqoQBhzubLaGspwAbsoD3G14LvDkfPA6jUU6cwBC1bZy';

  it("Invoke HelloWorld Wrapper", async () => {
    const pool = new ThreadPool({
      maxThreads: 50,
      aquireTimeout: 200,
    });
    const thread = new ClientThread({
      pool
    });

    const job = thread.invoke({
      uri: "ens/helloworld.polytest.eth",
      method: "logMessage",
      args: {
        message: "message!"
      }
    });

    const result = await job.promise;

    expect(result.result?.data).toBe(true);
    expect(result.error).toBeUndefined();
    expect(job.getStatus()).toBe("RESULT");
  });

  it("Invoke Uniswap Wrapper", async () => {
    const pool = new ThreadPool({
      maxThreads: 50,
      aquireTimeout: 200,
    });
    const thread = new ClientThread({
      pool
    });

    const job = thread.invoke({
      uri: uniswapV2Uri,
      method: "fetchTokenData",
      args: {
        chainId: "MAINNET",
        address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      }
    });

    const result = await job.promise;

    expect(result.result?.error).toBeFalsy();
    expect(result.result?.data).toMatchObject({
      "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      "chainId": 0,
      "currency": {
        "decimals": 18,
        "name": "Aave Token",
        "symbol": "AAVE"
      }
    });
    expect(result.error).toBeUndefined();
    expect(job.getStatus()).toBe("RESULT");
  });

  it("Terminate Uniswap Wrapper", async () => {
    const pool = new ThreadPool({
      maxThreads: 50,
      aquireTimeout: 200,
    });
    const thread = new ClientThread({
      pool
    });

    const job = thread.invoke({
      uri: uniswapV2Uri,
      method: "fetchTokenData",
      args: {
        chainId: "MAINNET",
        address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
      }
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 300);
    });

    expect(job.getStatus()).toBe(ThreadStatus.RUNNING);

    job.terminate();

    expect(job.getStatus()).toBe(ThreadStatus.TERMINATED);
    expect(await job.promise).toMatchObject({ });

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 6000);
    });

    expect(job.getStatus()).toBe(ThreadStatus.TERMINATED);
    expect(job.getResult()).toBeUndefined();
    expect(job.getError()).toBeUndefined();
  });

  it("Invoke HelloWorld Wrapper W/ Custom Plugin", async () => {
    const customClientModule = await transpileTypescriptModule(
      __dirname + "/customClient.ts"
    );
    const pool = new ThreadPool({
      maxThreads: 50,
      aquireTimeout: 200,
    });
    const thread = new ClientThread({
      pool,
      clientModule: customClientModule
    });

    const job = thread.invoke({
      uri: "ens/helloworld.polytest.eth",
      method: "logMessage",
      args: {
        message: "message!"
      }
    });

    const result = await job.promise;

    expect(result.error).toBeUndefined();
    expect(result.result?.data).toBe(true);
    expect(job.getStatus()).toBe("RESULT");
  });
});
