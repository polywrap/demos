use polywrap_wasm_rs::JSON;
use wrap::imported::subgraph_module;

pub mod wrap;
use wrap::*;

impl ModuleTrait for Module {
    fn subgraph_query(args: ArgsSubgraphQuery) -> Result<JSON::Value, String> {
        match SubgraphModule::query_subgraph(&subgraph_module::ArgsQuerySubgraph {
            url: format!("https://api.thegraph.com/subgraphs/name/{}/{}", args.subgraph_author, args.subgraph_name),
            query: args.query
        }) {
            Ok(v) => {
                let response = JSON::from_str::<JSON::Map<String, JSON::Value>>(&v).unwrap();
                Ok(response["data"].clone())
            },
            Err(e) => Err(e),
        }
    }
}
