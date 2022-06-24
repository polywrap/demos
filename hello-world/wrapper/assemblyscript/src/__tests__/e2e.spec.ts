import { PolywrapClient } from "@polywrap/client-js";

jest.setTimeout(30000)

describe("Hello world wrapper", () => {
  const client = new PolywrapClient()
  it("Should log as warning", async () => {

    const invocation = await client.invoke({
      uri: "fs/./build",
      method: "logMessage",
      input: {
        message: "Invokation being executed from wrapper!"
      }
    })
    expect(invocation).toBeTruthy()
  });
})
