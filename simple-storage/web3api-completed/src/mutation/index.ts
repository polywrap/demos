import {
  Ethereum_Mutation,
  Ipfs_Mutation,
  Input_setData,
  Input_deployContract,
  Input_setIpfsData,
  SetIpfsDataResult,
} from "./w3";
import { abi, bytecode } from "../contracts/SimpleStorage";

export function setData(input: Input_setData): string {
  return Ethereum_Mutation.sendTransaction({
    address: input.address,
    method: "function set(uint256 value)",
    args: [input.value.toString()],
    connection: input.connection
  });
}

export function deployContract(input: Input_deployContract): string {
  return Ethereum_Mutation.deployContract({
    abi,
    bytecode,
    args: null,
    connection: input.connection
  });
}

export function setIpfsData(input: Input_setIpfsData): SetIpfsDataResult {
  // 1. Upload the data to IPFS
  const ipfsHash = Ipfs_Mutation.addFile({
    data: String.UTF8.encode(input.options.data),
  });

  // 2. Add the data's IPFS hash to SimpleStorage using `setHash(...)`
  const txReceipt = Ethereum_Mutation.sendTransaction({
    address: input.options.address,
    method: 'function setHash(string value)',
    args: [ipfsHash],
    connection: input.connection
  });

  // 3. Return the result
  return {
    ipfsHash,
    txReceipt,
  };
}
