import { DateTimePlugin } from ".";
import { Query } from "./w3";

export const query = (plugin: DateTimePlugin): Query.Module => ({
  currentTime: () => {
    return plugin.currentTime();
  },
});
