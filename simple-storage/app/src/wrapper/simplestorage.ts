import { PolywrapClient } from "@polywrap/client-js";

export const uri = "ens/goerli/api.simplestorage.eth";

export async function setData(
  contract: string,
  value: number,
  client: PolywrapClient
): Promise<string> {

  const { data, error } = await client.invoke<string>({
    uri,
    method: "setData",
    args: {
      address: contract,
      value,
      connection: {
        networkNameOrChainId: "goerli"
      }
    },
  });

  if (error || !data) {
    throw error;
  }

  return data;
}

export async function deployContract(
  client: PolywrapClient
): Promise<string> {

  const { data, error } = await client.invoke<string>({
    uri,
    method: "deployContract",
    args: {
      connection: {
        networkNameOrChainId: "goerli"
      }
    },
  });

  if (error || !data) {
    throw error;
  }

  return data;
}
