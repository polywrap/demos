import { PolywrapClient } from "@polywrap/client-js";
import * as path from 'path'

jest.setTimeout(360000);

describe("rust async support", () => {
  let client: PolywrapClient;

  const dirname: string = path.resolve(__dirname);
  const wrapperPath: string = path.join(dirname, "..");
  const uri = `fs/${wrapperPath}/build`;

  beforeAll(async () => {
    client = new PolywrapClient({});
  });

    it("sync", async () => {
      const message = "hello world";
      const response = await client.invoke<string>({
        uri,
        method: "helloWorld",
        args: {message},
      });

      expect(response.data).toBe("hello world");
    });
    
    it("async spawn local", async () => {
      const message = "hello world";
      const response = await client.invoke<string>({
        uri,
        method: "helloWorldSpawnLocal",
        args: {message},
      });

      expect(response.data).toBe("hello world");
    });

    it("async future to promise", async () => {
      const message = "hello world";
      const response = await client.invoke<string>({
        uri,
        method: "helloWorldFutureToPromise",
        args: {message},
      });

      expect(response.data).toBe("hello world");
    });
});
