const { PluginModule } = require("@web3api/core-js");

class Query extends PluginModule {
  
  constructor(config) {
    super(config)
  }

  sampleQuery(input) {
    return input.data + this.config.defaultValue;
  }
}

module.exports = { Query }