const Internal = require("./w3")
const { Query } = require("./query")
const { Mutation } = require("./mutation")

class JsExamplePlugin extends Internal.JsExamplePlugin {
  constructor(config) {
    super({
      query: config
    })
  }

  static manifest() {
    return Internal.manifest
  }

  getModules() {
    return {
      query: new Query(this._configs.query),
      mutation: new Mutation(this._configs.mutation)
    }
  }
}

const jsExamplePlugin = (opts) => {
  return {
    factory: () => new JsExamplePlugin(opts),
    manifest: JsExamplePlugin.manifest(),
  };
};

const plugin = jsExamplePlugin;

module.exports = {
  JsExamplePlugin,
  jsExamplePlugin,
  plugin
}