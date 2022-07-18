import {Module, manifest, Args_currentTime} from "./wrap";

import { PluginFactory } from "@polywrap/core-js";

export class DateTimePlugin extends Module<{}> {

  constructor(config: {}) {
    super(config);
  }

  public currentTime(args: Args_currentTime): string {
    return Date.now().toString();
  }
}

export const dateTimePlugin: PluginFactory<{}> = () => {
  return {
    factory: () => new DateTimePlugin({}),
    manifest,
  };
};

export const plugin = dateTimePlugin;