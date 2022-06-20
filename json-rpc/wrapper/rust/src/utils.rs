use polywrap_wasm_rs::{JSON, Serialize};
use crate::{HttpResponse, Request, RpcError};

#[derive(Serialize)]
pub struct RpcData {
    jsonrpc: String,
    pub method: String,
    pub params: Option<JSON::Value>,
    pub id: Option<i32>,
}

impl RpcData {
    pub fn from(request: &Request) -> RpcData {
        RpcData {
            jsonrpc: String::from("2.0"),
            method: request.method.clone(),
            params: request.params.clone(),
            id: request.id,
        }
    }

    pub fn stringify(&self) -> String {
        match JSON::to_string::<self>(&self) {
            Ok(v) => v,
            Err(e) => panic!("{}", e)
        }
    }
}

// pub fn to_rpc_data(request: &Request) -> String {
//     let params: &str = match &request.params {
//         Some(v) => v.to_string().as_str(),
//         None => "null"
//     };
//
//     return JSON::json!({
//         "jsonrpc": "2.0",
//         "method": request.method.as_str(),
//         "params": params,
//         "id": request.id,
//     }).to_string();
// }

pub fn handle_unspecified_rpc_error(http_response: &HttpResponse) -> RpcError {
    match http_response.status {
        400 => RpcError {
            code: -32600,
            message: String::from("Invalid Request."),
            data: None,
        },
        404 => RpcError {
            code: -32601,
            message: String::from("Method not found."),
            data: None,
        },
        _ => RpcError {
            code: -32000,
            message: String::from("Server error."),
            data: None,
        }
    }
}