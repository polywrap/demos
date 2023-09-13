import { Args_logMessage, Logger_Module, ModuleBase } from "./wrap";

export class Module extends ModuleBase {
  logMessage(args: Args_logMessage): boolean {
    const result = Logger_Module.info({
      message: args.message,
    });

    return result.ok;
  }
}
