import {
  Web3ApiClient,
  createWeb3ApiClient
} from "@web3api/client-js";
import {
  initTestEnvironment,
  stopTestEnvironment,
  buildAndDeployApi
} from "@web3api/test-env-js";
import { dateTimePlugin } from "../../plugin";

jest.setTimeout(360000);

describe("e2e", () => {

  let client: Web3ApiClient;
  let uri: string;

  beforeAll(async () => {
    try {
      // Setup the local test environment
      const {
          ipfs,
          ethereum,
          ensAddress,
      } = await initTestEnvironment();

      // Create the client w/ test env configuration + the dateTimePlugin
      client = await createWeb3ApiClient({
        ethereum: {
          networks: {
            testnet: {
              provider: ethereum
            }
          },
          defaultNetwork: "testnet"
        },
        ipfs: {
          provider: ipfs,
          fallbackProviders: ["https://ipfs.io"]
        },
        ens: {
          addresses: {
            testnet: ensAddress
          }
        }
      }, {
        plugins: [{
          uri: "ens/datetime.eth",
          plugin: dateTimePlugin({}),
        }],
      });

      // build and deploy the wrapper
      const api = await buildAndDeployApi(
        `${__dirname}/../`,
        ipfs,
        ensAddress
      );

      uri = `ens/testnet/${api.ensDomain}`;
    } catch (e) {
      console.log(e)
      throw e;
    }
  });

  afterAll(async () => {
    await stopTestEnvironment();
  });

  it("e2e", async () => {
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
