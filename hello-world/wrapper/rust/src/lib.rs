pub mod wrap;
use polywrap_wasm_rs::JSON;
use wrap::imported::logger_module;
pub use wrap::*;

pub fn log_message(input: InputLogMessage) -> bool {
    match LoggerModule::info(&logger_module::InputInfo {
        message: input.message,
    }) {
        Ok(v) => v.unwrap(),
        Err(e) => panic!("{}", e),
    }
}
