use polywrap_wasm_rs::JSON;
use serde_json::*;
use wrap::imported::subgraph_module;

pub mod wrap;
pub use wrap::*;

pub fn subgraph_query(input: InputSubgraphQuery) -> JSON::Value {
    match SubgraphModule::query_subgraph(&subgraph_module::InputQuerySubgraph {
        subgraph_author: input.subgraph_author,
        subgraph_name: input.subgraph_name,
        query: input.query
    }) {
        Ok(v) => JSON::from_str(&v).unwrap(),
        Err(e) => panic!("{}", e),
    }
}
