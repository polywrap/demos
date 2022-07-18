import { InvokerOptions, InvokeResult } from "@polywrap/client-js";

// Thread events
export type ThreadEvent = InvokeEvent;

export interface InvokeEvent {
  readonly type: "Invoke";
  readonly clientModule?: string;
  readonly invoke: InvokerOptions;
}

// Host (main thread) actions
export type HostAction = InvokeResultAction | InvokeExceptionAction;

export interface InvokeResultAction {
  readonly type: "InvokeResult";
  readonly result: InvokeResult;
}

export interface InvokeExceptionAction {
  readonly type: "InvokeException";
  readonly error: Error;
}
