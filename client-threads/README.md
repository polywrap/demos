Run the Polywrap Client within a separate thread, enabling the application to terminate wrapper invocations, even in cases where WebAssembly modules are stuck in infinite loops.

If the wrapper were being invoked within the JS main thread, the infinite loop would halt the entire application.

Some reasons why you would want to use this "client thread" architecture are:
- Your application must be long-running and robust
- Executing foreign code

The Gelato nodes are an example of such a use-case: https://docs.gelato.network/guides/writing-a-resolver/polywrap-resolver

Example Usage (also see [e2e tests](https://github.com/polywrap/demos/blob/main/client-threads/src/__tests__/e2e.spec.ts)):
```typescript
const pool = new ThreadPool({
  maxThreads: 50,
  aquireTimeout: 200,
});
const thread = new ClientThread({
  pool
});

const job = thread.invoke({
  uri: "ens/v2.uniswap.web3api.eth",
  module: "query",
  method: "fetchTokenData",
  input: {
    chainId: "MAINNET",
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  }
});

await new Promise<void>((resolve) => {
  setTimeout(() => resolve(), 300);
});

job.getStatus(); // ThreadStatus.RUNNING

job.terminate();

job.getStatus(); // ThreadStatus.TERMINATED
job.getResult(); // undefined
job.getError(); // undefined
await job.promise // { }
```
