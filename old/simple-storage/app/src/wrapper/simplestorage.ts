import { Web3ApiClient } from "@web3api/client-js";

export const uri = "ens/rinkeby/api.simplestorage.eth";

export async function setData(
  contract: string,
  value: number,
  client: Web3ApiClient
): Promise<string> {
  const { data, errors } = await client.query<{
    setData: string
  }>({
    uri,
    query: `mutation {
      setData(
        address: "${contract}"
        value: ${value}
        connection: {
          networkNameOrChainId: "rinkeby"
        }
      )
    }`
  });

  if (errors || !data) {
    throw errors;
  }

  return data.setData;
}

export async function deployContract(
  client: Web3ApiClient
): Promise<string> {
  const { data, errors } = await client.query<{
    deployContract: string
  }>({
    uri,
    query: `mutation {
      deployContract(
        connection: {
          networkNameOrChainId: "rinkeby"
        }
      )
    }`
  });

  if (errors || !data) {
    throw errors;
  }

  return data.deployContract;
}
