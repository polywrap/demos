import { Input_logMessage, Console_Query } from "./w3";

export function logMessage(input: Input_logMessage): boolean {
  return Console_Query.info({
    message: input.message
  }).unwrap();
}
