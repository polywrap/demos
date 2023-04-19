pub mod wrap;
use polywrap_wasm_rs::JSON;
use wrap::imported::logger_module;
pub use wrap::*;

impl ModuleTrait for Module {
    fn log_message(args: ArgsLogMessage) -> Result<bool, String> {
        LoggerModule::info(&logger_module::ArgsInfo {
            message: args.message,
        })
    }
}
