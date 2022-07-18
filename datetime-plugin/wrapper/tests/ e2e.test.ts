import { PolywrapClient } from "@polywrap/client-js";
import { dateTimePlugin } from "../../plugin/build";
import path from "path"

jest.setTimeout(360000);

describe("e2e", () => {

  let client: PolywrapClient;
  let uri: string;

  beforeAll(async () => {
      // Create the client w/ test env configuration + the dateTimePlugin
      client = new PolywrapClient({
        plugins: [{
          uri: "ens/datetime.eth",
          plugin: dateTimePlugin({}),
        }],
      })

    // Get path to wrapper and create filesystem uri
    const wrapperPath: string = path.join(path.resolve(__dirname), "..");
    uri = `wrap://fs/${wrapperPath}/build`;
  });

  it("gets current datetime", async () => {
    // Query the polywrapper, which will
    // in turn query the dateTimePlugin
    const { data, error } = await client.invoke<string>({
      uri,
      method: "currentTime"
    });

    expect(error).toBeFalsy();
    expect(data).toBeTruthy();
    expect (Number.parseInt(data!)).toBeGreaterThanOrEqual(Date.now() - 300000);
    expect(Number.parseInt(data!)).toBeLessThanOrEqual(Date.now());
  });
});
