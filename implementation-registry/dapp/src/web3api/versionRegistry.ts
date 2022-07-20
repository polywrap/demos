import { Web3ApiClient } from "@web3api/client-js";
import { ethers } from "ethers";
import * as ethereumApi from "./ethereumApi";

export async function registerAPI(
  uri: string,
  client: Web3ApiClient
): Promise<void> {
  return ethereumApi.callContractMethodAndWait(
    client,
    process.env.REACT_APP_POLYWRAP_VERSION_REGISTRY_ADDRESS_RINKEBY!,
    `function registerAPI(bytes32) public`,
    [ethers.utils.namehash(uri)],
    "rinkeby"
  );
}

export async function checkIfApiRegistered(
  uri: string,
  client: Web3ApiClient
): Promise<boolean> {
  return ethereumApi.callContractView(
    client,
    process.env.REACT_APP_POLYWRAP_VERSION_REGISTRY_ADDRESS_RINKEBY!,
    `function apiToEns(bytes32) view returns(uint256)`,
    [ethers.utils.keccak256(ethers.utils.namehash(uri))],
    "rinkeby"
  ).then(result => {
    return result !== "0";
  });
}