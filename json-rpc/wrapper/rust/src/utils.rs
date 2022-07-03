use polywrap_wasm_rs::JSON;
use crate::{HttpResponse, Request, Response, RpcError};

pub fn request_to_json_string(request: &Request) -> String {
    let json_request = JSON::to_value(request).unwrap();
    let mut rpc_data = json_request.as_object().cloned().unwrap();
    rpc_data.insert(String::from("jsonrpc"), JSON::Value::from("2.0"));
    let json_string: String = JSON::Value::from(rpc_data).to_string();
    json_string
}

pub fn response_from_json_string(string_val: &str) -> Response {
    let json_val: Response = JSON::from_str(string_val).unwrap();
    json_val
}

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