import { DateTime_Module } from "./wrap";
import { BigInt } from "@polywrap/wasm-as";

export function currentTime(): BigInt {
  return DateTime_Module.currentTime({}).unwrap();
}
