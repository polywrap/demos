import {
  Args_subgraphQuery,
  Subgraph_Module
} from "./wrap";
import { JSON } from "@polywrap/wasm-as";

export function subgraphQuery(args: Args_subgraphQuery): JSON.Value {
  const response = Subgraph_Module.querySubgraph({
    subgraphAuthor: args.subgraphAuthor,
    subgraphName: args.subgraphName,
    query: args.query
  }).unwrap();

  const json = JSON.parse(response);

  if (!json.isObj) {
    throw new Error(
      "Subgraph response is not an object.\n" +
      `Author: ${args.subgraphAuthor}\n` +
      `Subgraph: ${args.subgraphName}\n` +
      `Query: ${args.query}\n` +
      `Response: ${response}`
    );
  }

  const obj = json as JSON.Obj;
  return obj.valueOf().get("data") as JSON.Value;
}
