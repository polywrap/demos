const { Module } = require("./w3");

class Mutation extends Module {
  sampleMutation(input) {
    return input.data.length > 0
  }
}

module.exports = { Mutation }
