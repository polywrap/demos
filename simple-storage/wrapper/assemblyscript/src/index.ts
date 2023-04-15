import {
  Ethereum_Module,
  Args_deployContract,
  Args_setData,
  Args_getData,
  ModuleBase,
} from "./wrap";
import { abi, bytecode } from "./contracts/SimpleStorage";

export class Module extends ModuleBase {

  getData(args: Args_getData): u32 {
    const res = Ethereum_Module.callContractView({
      address: args.address,
      method: "function get() view returns (uint256)",
      args: null,
      connection: args.connection,
    }).unwrap();

    return U32.parseInt(res);
  }

  setData(args: Args_setData): string {
    const res = Ethereum_Module.callContractMethod({
      address: args.address,
      method: "function set(uint256 value)",
      args: [args.value.toString()],
      connection: args.connection,
      options: null,
    }).unwrap();

    return res.hash;
  }

  deployContract(args: Args_deployContract): string {
    return Ethereum_Module.deployContract({
      abi,
      bytecode,
      args: null,
      connection: args.connection,
      options: null,
    }).unwrap();
  }
}