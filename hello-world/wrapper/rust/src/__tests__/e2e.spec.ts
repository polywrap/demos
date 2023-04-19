import { PolywrapClient } from "@polywrap/client-js";

jest.setTimeout(30000)

describe("Hello world wrapper", () => {
  const client = new PolywrapClient()
  it("Should log as warning", async () => {

    const result = await client.invoke<boolean>({
      uri: "fs/./build",
      method: "logMessage",
      args: {
        message: "Invocation being executed from wrapper!"
      }
    })
    if (!result.ok) throw result.error
    expect(result.value).toBeTruthy()
  });
})
