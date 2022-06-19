import { Nullable, JSON, JSONSerializer } from "@polywrap/wasm-as";
import { RpcError, Http_Response, Request } from "./wrap";

// @ts-ignore
@serializable
export class RpcData {
  jsonrpc: string;
  method: string;
  params: JSON.Value | null;
  id: Nullable<i32>;

  constructor(request: Request) {
    this.jsonrpc = "2.0";
    this.method = request.method;
    this.params = request.params;
    this.id = request.id;
  }

  static from(request: Request): RpcData {
    return new RpcData(request);
  }

  stringify(): string {
    return JSONSerializer.encode(this).stringify()
  }
}

export function handleUnspecifiedRpcError(httpResponse: Http_Response): RpcError {
  switch (httpResponse.status) {
    case 400:
      return {
        code: -32600,
        message: "Invalid Request.",
        data: null,
      };
    case 404:
      return {
        code: -32601,
        message: "Method not found.",
        data: null,
      };
    default:
      return {
        code: -32000,
        message: "Server error.",
        data: null,
      };
  }
}