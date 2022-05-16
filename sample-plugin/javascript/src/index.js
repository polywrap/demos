const { manifest } = require("./w3")
const { query } = require("./query")
const { mutation } = require("./mutation")

export class JsExamplePlugin {
  constructor(opts) {}

  static manifest() {
    return manifest
  }

  getModules() {
    return {
      query: query(this),
      mutation: mutation(this)
    }
  }

  sampleQuery(input) {
    return input.data + this.config.defaultValue 
  }

  sampleMutation(input) {
    return input.data.length > 0
  }
}

export const jsExamplePlugin = (opts) => {
  return {
    factory: () => new JsExamplePlugin(opts),
    manifest: JsExamplePlugin.manifest(),
  };
};

export const plugin = jsExamplePlugin;