pub mod wrap;
use polywrap_wasm_rs::JSON;
use wrap::imported::logger_module;
pub use wrap::*;

pub fn log_message(args: ArgsLogMessage) -> bool {
    match LoggerModule::info(&logger_module::ArgsInfo {
        message: args.message,
    }) {
        Ok(v) => v,
        Err(e) => panic!("{}", e),
    }
}
