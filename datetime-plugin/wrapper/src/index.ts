import {Args_currentTime, DateTime_Module} from "./wrap";
import { BigInt } from "@polywrap/wasm-as";

export function currentTime(_: Args_currentTime): BigInt {
  return DateTime_Module.currentTime({}).unwrap();
}
