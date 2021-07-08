import { Web3ApiClient } from "@web3api/client-js";
import { ethers } from "ethers";
import * as ethereumApi from "./ethereumApi";

export async function getImplementations(
  interfaceUri: string,
  client: Web3ApiClient
): Promise<string[]> {
  return ethereumApi.callView(
    client,
    process.env.REACT_APP_POLYWRAP_IMPLEMENTATION_REGISTRY_ADDRESS_RINKEBY!,
    `function getImplementations(bytes32) view returns(string[])`,
    [ethers.utils.keccak256(ethers.utils.namehash(interfaceUri))],
    "rinkeby"
  ).then(result => result.split(','));
}