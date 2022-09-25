use futures::executor;
use std::future::Future;
pub mod wrap;
pub use wrap::*;
use wrap::{ArgsHelloWorld, ArgsHelloWorldSpawnLocal};

pub fn hello_world(args: ArgsHelloWorld) -> String {
    args.message
}

// https://docs.rs/wasm-bindgen-futures/latest/wasm_bindgen_futures/fn.spawn_local.html
// Spawns a Future<Output = ()> on the current thread.
// the Future is executed in the background on the next microtask tick.
pub fn hello_world_spawn_local(args: ArgsHelloWorldSpawnLocal) -> String {
    let message_copy = args.message.clone();

    // use `async move` to force the async block to take ownership of variables
    let result = executor::block_on(async move {
        format!("{} {}", message_copy, "foo bar")
    });

    result
}
