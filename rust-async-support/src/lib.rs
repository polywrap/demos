use futures::executor;
pub mod wrap;
pub use wrap::*;
use wrap::{ArgsHelloWorld, ArgsHelloWorldSpawnLocal};

async fn concat_str(message: String) -> String {
    format!("{} {}", message, "foo bar")
}

pub fn hello_world(args: ArgsHelloWorld) -> String {
    args.message
}

pub fn hello_world_spawn_local(args: ArgsHelloWorldSpawnLocal) -> String {
    let result = executor::block_on(concat_str(args.message));

    result
}
