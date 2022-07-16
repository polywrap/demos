import { Args_logMessage, Logger_Module } from "./wrap";

export function logMessage(args: Args_logMessage): bool {
  return Logger_Module.info({
    message: args.message
  }).unwrap();
}
