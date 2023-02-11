import { PolywrapClient } from "@polywrap/client-js";

export const uri = "ens/goerli/api.simplestorage.eth";

export async function setData(
  contract: string,
  value: number,
  client: PolywrapClient
): Promise<string> {

  const result = await client.invoke<string>({
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

  if (!result.ok) {
    throw result.error;
  }

  return result.value;
}

export async function deployContract(
  client: PolywrapClient
): Promise<string> {

  const result = await client.invoke<string>({
    uri,
    method: "deployContract",
    args: {
      connection: {
        networkNameOrChainId: "goerli"
      }
    },
  });

  if (!result.ok) {
    throw result.error;
  }

  return result.value;
}
