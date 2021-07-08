import { Web3ApiClient } from "@web3api/client-js";

export async function getImplementations(
  interfaceUri: string,
  client: Web3ApiClient
): Promise<string[]> {
  const { data, errors } = await client.query<{
    callViewMethod: string[]
  }>({
    uri: "ens/ethereum.web3api.eth",
    query: `query {
      callViewMethod(
        method: "getImplementations() returns(string[])"
      )
    }`
  });

  if (errors || !data) {
    throw errors;
  }

  return data.callViewMethod;
}