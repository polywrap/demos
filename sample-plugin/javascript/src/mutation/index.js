const mutation = (plugin) => ({
  sampleMutation: async (input) => {
    return plugin.sampleMutation(input.data);
  },
});

module.exports = { mutation }