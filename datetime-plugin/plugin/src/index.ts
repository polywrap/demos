import { query } from "./resolvers";
import { manifest } from "./w3";

import {
  Plugin,
  PluginFactory,
  PluginPackageManifest,
  PluginModules,
} from "@web3api/core-js";

export class DateTimePlugin extends Plugin {
  constructor() {
    super();
  }

  public static manifest(): PluginPackageManifest {
    return manifest;
  }

  public getModules(): PluginModules {
    return {
      query: query(this),
    };
  }

  public currentTime(): string {
    return Date.now().toString();
  }
}

export const dateTimePlugin: PluginFactory<{}> = () => {
  return {
    factory: () => new DateTimePlugin(),
    manifest: DateTimePlugin.manifest(),
  };
};

export const plugin = dateTimePlugin;
