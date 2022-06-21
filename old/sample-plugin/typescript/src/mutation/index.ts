import { ExampleConfig } from "../common/ExampleConfig";
import { Module, Input_sampleMutation } from "./w3";

export interface MutationConfig extends ExampleConfig, Record<string, unknown> {} 

export class Mutation extends Module<MutationConfig> {
  public sampleMutation(input: Input_sampleMutation): boolean {
    return input.data.length > 0
  }
}