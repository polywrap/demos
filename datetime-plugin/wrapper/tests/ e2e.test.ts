import { PolywrapClient } from "@polywrap/client-js";
import { dateTimePlugin } from "../../plugin";
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
    const { data, errors } = await client.query<{
      currentTime: string
    }>({
      uri,
      query: `query { currentTime }`,
    });

    expect(errors).toBeFalsy();
    expect(data).toBeTruthy();
    expect(data?.currentTime).toBeTruthy();
    expect(Number.parseInt(data?.currentTime) <= Date.now()).toBeTruthy();
  });
});
