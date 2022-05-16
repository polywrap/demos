const { PluginModule } = require("@web3api/core-js");

class Mutation extends PluginModule {
    
  constructor(config) {
    super(config)
  }

  sampleMutation(input) {
    return input.data.length > 0
  }
}

module.exports = { Mutation }