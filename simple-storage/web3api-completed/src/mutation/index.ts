import { Ethereum_Mutation, Ipfs_Mutation } from './w3/imported';
import {
  Input_setData,
  SetDataResult,
  Input_setIpfsData,
  SetIpfsDataResult,
} from './w3';
import { abi, bytecode } from '../contracts/SimpleStorage';

export function setData(input: Input_setData): SetDataResult {
  const hash = Ethereum_Mutation.sendTransaction({
    address: input.options.address,
    method: 'function set(uint256 value)',
    args: [input.options.value.toString()],
  });
  return {
    txReceipt: hash,
    value: input.options.value,
  };
}

export function setIpfsData(input: Input_setIpfsData): SetIpfsDataResult {
  const ipfsHash = Ipfs_Mutation.addFile({
    data: input.options.data,
  });

  const txReceipt = Ethereum_Mutation.sendTransaction({
    address: input.options.address,
    method: 'function setHash(bytes value)',
    args: [ipfsHash.path],
  });

  return {
    ipfsHash: ipfsHash.path,
    txReceipt,
  };
}

export function deployContract(): string {
  return Ethereum_Mutation.deployContract({
    abi,
    bytecode,
  });
}
