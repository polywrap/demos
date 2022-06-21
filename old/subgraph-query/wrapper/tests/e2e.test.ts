import {
  Web3ApiClient,
  createWeb3ApiClient
} from "@web3api/client-js";
import {
  initTestEnvironment,
  stopTestEnvironment,
  buildAndDeployApi
} from "@web3api/test-env-js";

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

      // Create the client w/ test env configuration
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
    const subgraphQueryInput = {
      author: "ensdomains",
      name: "ens",
      query: `{
        domains(first: 5) {
          id
          name
          labelName
          labelhash
        }
      }`
    };

    // Query the polywrapper, which will
    // in turn query the subgraph
    const { data, errors } = await client.query<{
      // Type the method's return type (GraphQL JSON == JS string)
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
    expect(data?.subgraphQuery).toBeTruthy()

    const json = JSON.parse(data?.subgraphQuery as string);
    console.log(json);
    expect(json).toBeTruthy();
  });
});
