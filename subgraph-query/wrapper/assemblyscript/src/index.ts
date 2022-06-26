import {
  Input_subgraphQuery,
  Subgraph_Module
} from "./wrap";
import { JSON } from "@polywrap/wasm-as";

export function subgraphQuery(input: Input_subgraphQuery): JSON.Value {
  const response = Subgraph_Module.querySubgraph({
    subgraphAuthor: input.subgraphAuthor,
    subgraphName: input.subgraphName,
    query: input.query
  }).unwrap();

  const json = JSON.parse(response);

  if (!json.isObj) {
    throw new Error(
      "Subgraph response is not an object.\n" +
      `Author: ${input.subgraphAuthor}\n` +
      `Subgraph: ${input.subgraphName}\n` +
      `Query: ${input.query}\n` +
      `Response: ${response}`
    );
  }

  const obj = json as JSON.Obj;
  return obj.valueOf().get("data") as JSON.Value;
}
