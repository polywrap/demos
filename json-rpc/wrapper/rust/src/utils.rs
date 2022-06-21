use polywrap_wasm_rs::JSON;
use crate::{HttpResponse, Request, Response, RpcError};

pub fn request_to_json_string(request: &Request) -> String {
    let json_request = JSON::to_value(request).unwrap();
    let mut rpc_data = json_request.as_object().cloned().unwrap();
    let protocol: JSON::Value = JSON::Value::from("2.0");
    rpc_data.insert(String::from("jsonrpc"), protocol);
    let json_string: String = JSON::Value::from(rpc_data).to_string();
    json_string
}

pub fn response_from_json_string(string_val: String) -> Response {
    let json_val: JSON::Value = JSON::from_str(string_val.as_str()).unwrap();
    let json_obj: &JSON::Map<String, JSON::Value> = json_val.as_object().unwrap();
    let result: Option<JSON::Value> = json_obj.get("result").cloned();
    let error: Option<RpcError> = match json_obj.get("error").cloned() {
        Some(v) => match JSON::from_value::<RpcError>(v) {
            Ok(v) => Some(v),
            _ => None
        },
        None => None
    };
    let id = match json_obj.get("id").cloned() {
        Some(v) => String::from(v.as_str().unwrap_or("")),
        None => String::from(""),
    };
    Response {
        result,
        error,
        id,
    }
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