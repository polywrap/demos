import { Input_logMessage, Logger_Module } from "./wrap";

export function logMessage(input: Input_logMessage): boolean {
  return Logger_Module.info({
    message: input.message
  }).unwrap();
}
