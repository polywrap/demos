import {
  Web3ApiClientConfig,
  InvokeApiOptions,
  InvokeApiResult
} from "@web3api/client-js";

// Thread events
export type ThreadEvent =
  | InvokeEvent;

export interface InvokeEvent {
  readonly type: "Invoke";
  readonly client?: Partial<Web3ApiClientConfig>;
  readonly invoke: InvokeApiOptions;
}

// Host (main thread) actions
export type HostAction =
  | InvokeResultAction
  | InvokeExceptionAction;

export interface InvokeResultAction {
  readonly type: "InvokeResult";
  readonly result: InvokeApiResult;
}

export interface InvokeExceptionAction {
  readonly type: "InvokeException";
  readonly error: Error;
}
