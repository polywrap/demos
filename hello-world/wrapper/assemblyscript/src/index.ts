import { Args_logMessage, Logger_Module, ModuleBase } from "./wrap";

export class Module extends ModuleBase {

  logMessage(args: Args_logMessage): bool {
    return Logger_Module.info({
      message: args.message
    }).unwrap();
  }

}