pub mod wrap;
mod utils;

use std::collections::BTreeMap;
pub use wrap::*;
use polywrap_wasm_rs::JSON;
use crate::imported::http_module;
use crate::utils::{handle_unspecified_rpc_error, request_to_json_string, response_from_json_string};

impl ModuleTrait for Module {

    fn query(args: ArgsQuery) -> Result<Option<Response>, String> {
        let mut headers = BTreeMap::<String, String>::new();
        headers.insert(String::from("Content-Type"), String::from("application/json"));
        headers.insert(String::from("Accept"), String::from("application/json"));
        
        let http_response: HttpHttpResponse = match HttpModule::post(&http_module::ArgsPost {
            url: args.url,
            request: Some(HttpHttpRequest {
                headers: Some(headers),
                url_params: None,
                response_type: HttpHttpResponseType::TEXT,
                body: Some(request_to_json_string(&args.request)),
                form_data: None,
                timeout: None,
            }),
        }) {
            Ok(Some(v)) => v,
            Ok(None) => return Err("Did not receive HTTP response".to_string()),
            Err(e) => return Err(format!("{}", e)),
        };

        // handle json rpc error
        if http_response.status == 400 || http_response.status == 404 || http_response.status == 500 {
            // TODO: how to handle json rpc notification (i.e. no request id) when error occurs?
            return match http_response.body {
                Some(v) => Ok(Some(response_from_json_string(&v))),
                // handle unexpected missing response body
                None => {
                    let error: Option<RpcError> = Some(handle_unspecified_rpc_error(&http_response));
                    let id: String = args.request.id.unwrap_or(String::from(""));
                    Ok(
                        Some(Response {
                            result: None,
                            error,
                            id,
                        })
                    )
                }
            };
        }

        // handle json rpc success
        if http_response.status >= 200 && http_response.status <= 299 {
            if args.request.id.is_none() {
                // response was not requested
                return Ok(None);
            }
            return match http_response.body {
                Some(v) => Ok(Some(response_from_json_string(&v))),
                None => Err(format!("Missing response with successful HTTP status {}", http_response.status))
            };
        }

        return Err(format!("Unexpected HTTP response status: {}", http_response.status));
    }
}
