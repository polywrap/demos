export const query = (plugin) => ({
  sampleQuery: async (input) => {
    return plugin.sampleQuery(input.data);
  },
});