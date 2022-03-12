import Worker from "web-worker";

export interface Thread {
  worker: Worker;
  threadId: number;
}

export interface ThreadPoolConfig {
  maxThreads: number;
  aquireTimeout: number;
}

export class ThreadPool {

  private _threadsActive: number;
  private _threadIds: number[];
  private _threadMutexesBuffer: SharedArrayBuffer;
  private _threadMutexes: Int32Array;

  constructor(private _config: ThreadPoolConfig) {
    const { maxThreads, aquireTimeout } = this._config;

    if (maxThreads <= 0) {
      throw Error("ThreadPool: maxThreads must be greater than 0");
    }

    if (aquireTimeout < 0) {
      throw Error("ThreadPool: aquireTimeout must be greater than or equal to 0");
    }

    this._threadsActive = 0;
    this._threadIds = Array.from({
      length: maxThreads
    }, (_, i) => i);
    this._threadMutexesBuffer = new SharedArrayBuffer(
      maxThreads * Int32Array.BYTES_PER_ELEMENT
    );
    this._threadMutexes = new Int32Array(
      this._threadMutexesBuffer,
      0,
      maxThreads
    );
  }

  public async acquireThread(modulePath: string): Promise<Thread> {
    const { maxThreads, aquireTimeout } = this._config;

    while (this._threadsActive >= maxThreads || this._threadIds.length === 0) {
      // Wait for another thread to become available
      await this._sleep(aquireTimeout);
    }

    this._threadsActive++;
    const threadId = this._threadIds.pop() as number;

    Atomics.store(this._threadMutexes, threadId, 0);

    const worker = new Worker(modulePath);

    return {
      worker,
      threadId
    };
  }

  public terminateThread(thread: Thread): void {
    Atomics.store(
      this._threadMutexes,
      thread.threadId,
      0
    );
    thread.worker.terminate();
    this._threadsActive--;
    this._threadIds.push(thread.threadId);
  }

  public notifyThread(thread: Thread, status: number): void {
    Atomics.store(
      this._threadMutexes,
      thread.threadId,
      status
    );
    Atomics.notify(
      this._threadMutexes,
      thread.threadId,
      Infinity
    );
  }

  private _sleep(ms: number): Promise<void> {
    return new Promise((resolve: () => void) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }
}
