import { PolywrapClient } from "@polywrap/client-js";

describe("Hello world wrapper", () => {
  const client = new PolywrapClient()
  it("Should log as warning", async () => {
    await client.invoke({
      uri: "fs/./build",
      method: "warning",
    })
  });
})
