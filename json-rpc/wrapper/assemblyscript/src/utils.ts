import { JSON } from "@polywrap/wasm-as";
import { RpcError, Http_Response, Request, Response } from "./wrap";

export function requestToJsonString(request: Request): string {
  const result: JSON.Obj = JSON.Value.Object();
  result.set("jsonrpc", JSON.from("2.0"))
  result.set("method", JSON.from(request.method));
  if (request.params != null) {
    result.set("params", request.params!)
  }
  if (request.id !== null) {
    result.set("id", JSON.from(request.id!));
  }
  return result.stringify();
}

export function responseFromJsonString(stringVal: string): Response {
  const jsonObj: JSON.Obj = <JSON.Obj>JSON.parse(stringVal);
  const result: JSON.Value | null = jsonObj.getValue("result");
  const jsonError: JSON.Value | null = jsonObj.getValue("error");
  let error: RpcError | null = null;
  if (jsonError !== null) {
    const jsonErrorObj: JSON.Obj = <JSON.Obj>jsonError;
    error = {
      code: <i32>jsonErrorObj.getInteger("code")!.valueOf(),
      message: jsonErrorObj.getString("message")!.valueOf(),
      data: jsonErrorObj.getValue("data"),
    };
  }
  const jsonId: JSON.Str | null = jsonObj.getString("id");
  const id: string = jsonId === null ? "" : jsonId!.valueOf();
  return {
    result,
    error,
    id,
  };
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