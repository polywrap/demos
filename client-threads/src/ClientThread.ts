import { ThreadPool } from "./ThreadPool";
import { ThreadJob, ThreadStatus } from "./ThreadJob";
import { HostAction, InvokeEvent } from "./messages";

import { InvokerOptions, InvokeResult } from "@polywrap/client-js";

interface ClientThreadConfig {
  pool: ThreadPool;
  clientModule?: string;
}

export class ClientThread {
  constructor(private _config: ClientThreadConfig) { }

  public invoke<TData = unknown>(
    options: InvokerOptions
  ): ThreadJob<InvokeResult> {
    const { pool, clientModule } = this._config;

    let status: ThreadStatus = ThreadStatus.ACQUIRING_THREAD;
    let terminate: () => void = () => {
      status = ThreadStatus.TERMINATED;
    };
    let result: InvokeResult<TData> | undefined;
    let error: Error | undefined;

    const promise = new Promise<{
      result?: InvokeResult<TData>,
      error?: Error
    }>(
      async (resolve) => {
        const thread = await pool.acquireThread(
          ClientThread.modulePath()
        );

        terminate = () => {
          status = ThreadStatus.TERMINATED;
          pool.terminateThread(thread);
          resolve({ });
        };

        promise.finally(() => {
          if (status !== ThreadStatus.TERMINATED) {
            pool.terminateThread(thread);
          }
        })

        if (status === ThreadStatus.TERMINATED) {
          resolve({ });
          return;
        } else {
          status = ThreadStatus.RUNNING;
        }

        thread.worker.addEventListener(
          "message",
          (event: { data: HostAction }) => {
            const action = event.data;

            switch (action.type) {
              case "InvokeResult": {
                result = action.result as InvokeResult<TData>;
                status = ThreadStatus.RESULT;
                break;
              }
              case "InvokeException": {
                error = action.error;
                status = ThreadStatus.ERROR;
                break;
              }
            }

            resolve({
              result,
              error,
            });
          }
        );

        const event: InvokeEvent = {
          type: "Invoke",
          clientModule,
          invoke: options,
        };

        thread.worker.postMessage(event);
      }
    );

    return {
      terminate: () => terminate(),
      promise,
      getStatus: () => status,
      getResult: () => result,
      getError: () => error,
    };
  }

  public static modulePath(): string {
    let modulePath = process.env.CLIENT_THREAD_PATH || "./thread.js";

    // If we're in node.js
    if (typeof process === "object" && typeof window === "undefined") {
      modulePath = `file://${__dirname}/thread.js`;

      if (process.env.TEST) {
        modulePath = `file://${__dirname}/thread-loader.js`;
      }
    }

    return modulePath;
  }
}
