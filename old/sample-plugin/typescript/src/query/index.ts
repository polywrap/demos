import { ExampleConfig } from "../common/ExampleConfig";
import { Module, Input_sampleQuery } from "./w3";

export interface QueryConfig extends ExampleConfig, Record<string, unknown> {}

export class Query extends Module<QueryConfig> {
  public sampleQuery(input: Input_sampleQuery): string {
    return input.data + this.config.defaultValue 
  }
}