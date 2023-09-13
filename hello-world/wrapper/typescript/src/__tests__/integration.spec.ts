import { PolywrapClient } from "@polywrap/client-js";
import path from "path";

jest.setTimeout(60000);

describe("TS Hello world wrap", () => {
  const client: PolywrapClient = new PolywrapClient();
  let wrapUri = `file://${path.join(__dirname, "../../build")}`;

  it("invoke foo", async () => {
    const result = await client.invoke({
      uri: wrapUri,
      method: "logMessage",
      args: { message: "Invocation being executed from wrapper!" },
    });

    if (!result.ok) throw result.error;
    expect(result.value).toBeTruthy();
  });
});
