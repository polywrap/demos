import { Ethereum_Query, Ipfs_Query } from './w3/imported';
import {
  Input_getData,
  Input_getIpfsData,
} from './w3';

export function getData(input: Input_getData): u32 {
  const res = Ethereum_Query.callView({
    address: input.address,
    method: 'function get() view returns (uint256)',
    args: [],
  });
  return U32.parseInt(res);
}

export function getIpfsData(input: Input_getIpfsData): ArrayBuffer {
  const hash = Ethereum_Query.callView({
    address: input.address,
    method: 'function getHash() view returns (bytes)',
    args: [],
  });

  return Ipfs_Query.catFile({ cid: hash });
}
