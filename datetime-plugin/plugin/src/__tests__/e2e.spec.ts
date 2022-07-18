import { PolywrapClient } from "@polywrap/client-js";
import { dateTimePlugin } from "../";

describe("e2e", () => {

  let client: PolywrapClient;
  const uri = "ens/datetime-plugin.eth";

  beforeAll(() => {
    // Add the dateTimePlugin to the PolywrapClient
    client = new PolywrapClient({
      plugins: [
        {
          uri: uri,
          plugin: dateTimePlugin({})
        }
      ]
    });
  });

  it("retrieves current datetime", async () => {
    const result = await client.invoke({
      uri,
      method: "currentTime"
    });

    expect(result.error).toBeFalsy();
    expect(result.data).toBeTruthy();
    expect(typeof result.data).toBe("string");
    expect(result.data).toMatch(/^\d+$/);
  });
});
