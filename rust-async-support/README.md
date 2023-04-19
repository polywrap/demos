# Notes
## js glue
wasm_bindgen_futures causes the following error in wasm-bindgen-cli

  ```import of wasm-bindgen specific intrinsic `__wbindgen_cb_drop` requires JS glue```

the error appears only when WASM_INTERFACE_TYPES=1

## rust futures
 - a Future is executed after the current function.
 - a Future always outlives the current function.
 - when a Future runs, the outside variable no longer exists, the stack frame is gone.
 - a Future always outlives the stack.
 - a Future must be 'static, which restricts it to contain only owned values or 'static references (no stack references).
 - a Future cannot contain stack references.
 - a Future must take ownership of outside variables.

even though it's written as one function, it's actually two: one executed before the yield point, and one after. And the stack space for the first function goes away when you call the async function.
