import { SamplePlugin } from '.';

import { PluginModule } from '@web3api/core-js';

export const query = (plugin: SamplePlugin): PluginModule => ({
  getData: async (input: { query: string }) => {
    return await plugin.getData(input.query);
  },
});

export const mutation = (plugin: SamplePlugin): PluginModule => ({
  setData: async (input: { id: string; data: Uint8Array }) => {
    return await plugin.setData(input.id, input.data);
  },
});
