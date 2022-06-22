pub mod wrap;
mod utils;

pub use wrap::*;
use polywrap_wasm_rs::JSON;
use crate::imported::http_module;
use crate::utils::{handle_unspecified_rpc_error, request_to_json_string, response_from_json_string};

pub fn query(input: InputQuery) -> Option<Response> {

    let http_response: HttpResponse = match HttpModule::post(&http_module::InputPost {
        url: input.url,
        request: Some(HttpRequest {
            headers: Some(vec![
            HttpHeader { key: String::from("Content-Type"), value: String::from("application/json") },
            HttpHeader { key: String::from("Accept"), value: String::from("application/json") },
            ]),
            url_params: None,
            response_type: HttpResponseType::TEXT,
            body: Some(request_to_json_string(&input.request)),
        }),
    }) {
        Ok(Some(v)) => v,
        Ok(None) => panic!("Did not receive HTTP response"),
        Err(e) => panic!("{}", e),
    };

    // handle json rpc error
    if http_response.status == 400 || http_response.status == 404 || http_response.status == 500 {
        // TODO: how to handle json rpc notification (i.e. no request id) when error occurs?
        return match http_response.body {
            Some(v) => Some(response_from_json_string(v)),
            // handle unexpected missing response body
            None => {
                let error: Option<RpcError> = Some(handle_unspecified_rpc_error(&http_response));
                let id: String = input.request.id.unwrap_or(String::from(""));
                return Some(Response {
                    result: None,
                    error,
                    id,
                });
            }
        };
    }

    // handle json rpc success
    if http_response.status >= 200 && http_response.status <= 299 {
        if input.request.id.is_none() {
            // response was not requested
            return None;
        }
        return match http_response.body {
            Some(v) => Some(response_from_json_string(v)),
            None => panic!("Missing response with successful HTTP status {}", http_response.status)
        };
    }

    panic!("Unexpected HTTP response status: {}", http_response.status);
}


