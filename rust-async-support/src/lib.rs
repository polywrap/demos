pub mod wrap;
pub use wrap::*;
use wrap::{ArgsHelloWorld, ArgsHelloWorldFutureToPromise, ArgsHelloWorldSpawnLocal};

pub fn hello_world(args: ArgsHelloWorld) -> String {
    args.message
}

// https://docs.rs/wasm-bindgen-futures/latest/wasm_bindgen_futures/fn.spawn_local.html
// Spawns a Future<Output = ()> on the current thread.
// the Future is executed in the background on the next microtask tick.
pub fn hello_world_spawn_local(args: ArgsHelloWorldSpawnLocal) -> String {
    let message_copy = args.message.clone();

    // use `async move` to force the async block to take ownership of variables
    wasm_bindgen_futures::spawn_local(async move {
        let message = &message_copy;
        ()
    });

    args.message
}

// https://docs.rs/wasm-bindgen-futures/latest/wasm_bindgen_futures/fn.future_to_promise.html
// Converts a Rust Future<Output = Result<JsValue, JsValue>> into a JavaScript Promise.
pub fn hello_world_future_to_promise(args: ArgsHelloWorldFutureToPromise) -> String {
    let message_copy = args.message.clone();

    // use `async move` to force the async block to take ownership of variables
    let promise: js_sys::Promise = wasm_bindgen_futures::future_to_promise(async move {
        let message = message_copy;
        let jsvalue = wasm_bindgen::JsValue::from_str(&message);
        Ok(jsvalue)
    });

    // https://docs.rs/wasm-bindgen-futures/latest/wasm_bindgen_futures/struct.JsFuture.html
    // Promise can be converted back to async as a Future<Output = Result<JsValue, JsValue>>
    // let future = wasm_bindgen_futures::JsFuture::from(promise);

    args.message
}
