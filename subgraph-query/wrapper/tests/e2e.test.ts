import {
  Web3ApiClient,
  PluginRegistration
} from "@web3api/client-js";
import {
  initTestEnvironment,
  stopTestEnvironment,
  buildAndDeployApi
} from "@web3api/test-env-js";
import { graphNodePlugin } from "@web3api/graph-node-plugin-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { ipfsPlugin } from "@web3api/ipfs-plugin-js";
import { ensPlugin } from "@web3api/ens-plugin-js";

jest.setTimeout(360000);

describe("e2e", () => {

  let client: Web3ApiClient;
  let uri: string;

  beforeAll(async () => {
    try {
      // Setup the local test environment
      const {
        cliLogs: {
          stdout,
          stderr,
          exitCode,
        },
        results: {
          ipfs,
          ethereum,
          ensAddress,
        },
      } = await initTestEnvironment();

      // Setup JavaScript plugins
      const plugins: PluginRegistration[] = [];

      // Create Graph-Node Plugin:
      // - provider: the hosted subgraph provider
      plugins.push({
        uri: "/ens/graph-node.eth",
        plugin: graphNodePlugin({
          provider: "https://api.thegraph.com"
        })
      });

      // Create Test Environment Plugins:
      plugins.push(
        {
          uri: "w3://ens/ethereum.web3api.eth",
          plugin: ethereumPlugin(
            {
            networks: {
              testnet: {
                provider: ethereum
              }
            },
            defaultNetwork: "testnet"
          }),
        },
        {
          uri: "w3://ens/ipfs.web3api.eth",
          plugin: ipfsPlugin({
            provider: ipfs,
            fallbackProviders: ["https://ipfs.io"]
          })
        },
        {
          uri: "w3://ens/ens.web3api.eth",
          plugin: ensPlugin({
            addresses: {
              testnet: ensAddress
            }
          })
        }
      );

      // Create the client
      client = new Web3ApiClient({ plugins });

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
    const subgraphQueryInput = {
      author: "tasitlabs",
      name: "gnosis-safe",
      query: `{
        contractBasedAccounts {
          id
          timeCreated
        }
      }`
    };

    // Query the polywrapper, which will
    // in turn query the subgraph
    const { data, errors } = await client.query<{
      // Type the metho's return type (GraphQL JSON == JS string)
      subgraphQuery: string
    }>({
      uri,
      query: `query {
        subgraphQuery(
          subgraphAuthor: $author
          subgraphName: $name
          query: $query
        )
      }`,
      variables: subgraphQueryInput
    });

    expect(errors).toBeFalsy();
    expect(data).toBeTruthy();
    expect(data.subgraphQuery).toBeTruthy()

    const json = JSON.parse(data.subgraphQuery);
    console.log(json);
    expect(json).toBeTruthy();
  });
});
