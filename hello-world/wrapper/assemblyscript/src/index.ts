import { Input_logMessage, Logger_Module } from "./wrap";

export function logMessage(input: Input_logMessage): bool {
  return Logger_Module.info({
    message: input.message
  }).unwrap();
}
