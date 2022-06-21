export enum ThreadStatus {
  ACQUIRING_THREAD = "ACQUIRING_THREAD",
  RUNNING = "RUNNING",
  RESULT = "RESULT",
  ERROR = "ERROR",
  TERMINATED = "TERMINATED",
};

export interface ThreadJob<TResult, TError = Error> {
  promise: Promise<{
    result?: TResult,
    error?: TError
  }>;
  terminate: () => void;
  getStatus(): ThreadStatus;
  getResult(): TResult | undefined;
  getError(): TError | undefined;
}
