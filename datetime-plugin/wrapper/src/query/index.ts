import {
  DateTime_Query
} from "./w3";
import {
  BigInt
} from "@web3api/wasm-as";

export function currentTime(): BigInt {
  return DateTime_Query.currentTime({});
}
