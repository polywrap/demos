const { Module } = require("./w3");

class Query extends Module {
  sampleQuery(input) {
    return input.data + this.config.defaultValue;
  }
}

module.exports = { Query }
