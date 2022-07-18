use polywrap_wasm_rs::JSON;
use serde_json::*;
use wrap::imported::subgraph_module;

pub mod wrap;
pub use wrap::*;

pub fn subgraph_query(args: ArgsSubgraphQuery) -> JSON::Value {
    match SubgraphModule::query_subgraph(&subgraph_module::ArgsQuerySubgraph {
        subgraph_author: args.subgraph_author,
        subgraph_name: args.subgraph_name,
        query: args.query
    }) {
        Ok(v) => {
            let response = JSON::from_str::<Map<String, JSON::Value>>(&v).unwrap();
            response["data"].clone()
        },
        Err(e) => panic!("{}", e),
    }
}
