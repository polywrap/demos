// TIP: All user-defined code lives in the module folders (./query, ./mutation)

import * as Internal from "./w3";
import { ExampleConfig } from "./common/ExampleConfig";

import { PluginFactory } from "@web3api/core-js";

export { manifest, schema } from "./w3";

export interface ExamplePluginConfigs
  extends ExampleConfig,
    Record<string, unknown> {}

export class EthereumPlugin extends Internal.TsExamplePlugin {
  constructor(config: ExamplePluginConfigs) {
    super({
      query: config,
      mutation: config,
    });
  }
}

export const tsExamplePlugin: PluginFactory<ExamplePluginConfigs> = (
  opts: ExamplePluginConfigs
) =>
  Internal.tsExamplePlugin({
    query: opts,
    mutation: opts,
  });

export const plugin = tsExamplePlugin;
