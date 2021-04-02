import { Ethereum_Query, Ipfs_Query } from './w3/imported';
import {
  Input_getData,
  GetDataResult,
  Input_getIpfsData,
  GetIpfsDataResult,
} from './w3';

export function getData(input: Input_getData): GetDataResult {
  const res = Ethereum_Query.callView({
    address: input.options.address,
    method: 'function get() view returns (uint256)',
    args: [],
  });
  return U32.parseInt(res);
}

export function getIpfsData(input: Input_getIpfsData): GetIpfsDataResult {
  const res = Ipfs_Query.getFile({ path: input.options.address });
  return;
}
