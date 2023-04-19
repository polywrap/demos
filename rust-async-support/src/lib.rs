use futures::executor;
pub mod wrap;
pub use wrap::*;
use wrap::{ArgsHelloWorld, ArgsHelloWorldSpawnLocal};

impl ModuleTrait for Module {
    fn hello_world(args: ArgsHelloWorld) -> Result<String, String> {
        Ok(args.message)
    }

    fn hello_world_spawn_local(args: ArgsHelloWorldSpawnLocal) -> Result<String, String> {
        let result = executor::block_on(concat_str(args.message));
        Ok(result)
    }
}

async fn concat_str(message: String) -> String {
    format!("{} {}", message, "foo bar")
}