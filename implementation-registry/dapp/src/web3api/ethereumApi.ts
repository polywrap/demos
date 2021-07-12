import { Web3ApiClient } from "@web3api/client-js";

export const callContractView = async (
  client: Web3ApiClient,
  address: string,
  method: string,
  args: string[],
  networkNameOrChainId?: string
): Promise<string> => {
  const { data, errors } = await client.query<{
    callContractView: string
  }>({
    uri: "w3://ens/ethereum.web3api.eth",
    query: `query {
      callContractView(
        address: $address,
        method: $method,
        args: $args,
        connection: $connection
      )
    }`,
    variables: {
      address,
      method,
      args,
      connection: networkNameOrChainId
        ? {
            networkNameOrChainId,
          }
        : undefined,
    },
  });

  if (errors && errors.length) {
    throw errors;
  }

  if (data && data.callContractView) {
    return data.callContractView;
  }

  throw Error(
    `Ethereum.callContractView returned nothing.\nData: ${data}\nErrors: ${errors}`
  );
};

export const callContractMethod = async (
  client: Web3ApiClient,
  address: string,
  method: string,
  args: string[],
  networkNameOrChainId?: string
): Promise<void> => {
  const { data, errors } = await client.query<{
    callContractMethod: string
  }>({
    uri: "w3://ens/ethereum.web3api.eth",
    query: `mutation {
      callContractMethod(
        address: $address,
        method: $method,
        args: $args,
        connection: $connection
      )
    }`,
    variables: {
      address,
      method,
      args,
      connection: networkNameOrChainId
        ? {
            networkNameOrChainId,
          }
        : undefined,
    },
  });

  if (errors && errors.length) {
    throw errors;
  }
};

export const callContractMethodAndWait = async (
  client: Web3ApiClient,
  address: string,
  method: string,
  args: string[],
  networkNameOrChainId?: string
): Promise<void> => {
  const { data, errors } = await client.query<{
    callContractMethodAndWait: string
  }>({
    uri: "w3://ens/ethereum.web3api.eth",
    query: `mutation {
      callContractMethodAndWait(
        address: $address,
        method: $method,
        args: $args,
        connection: $connection
      )
    }`,
    variables: {
      address,
      method,
      args,
      connection: networkNameOrChainId
        ? {
            networkNameOrChainId,
          }
        : undefined,
    },
  });

  if (errors && errors.length) {
    throw errors;
  }
};