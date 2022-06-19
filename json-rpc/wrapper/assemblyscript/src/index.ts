import { Http_Module, Http_Response, Http_ResponseType, Input_query, Response } from "./wrap";
import { handleUnspecifiedRpcError, RpcData } from "./utils";
import { JSON } from "@polywrap/wasm-as";

export function query(input: Input_query): Response | null {
  const httpResponse: Http_Response | null = Http_Module.post({
    url: input.url,
    request: {
      headers: [
        { key: "Content-Type", value: "application/json-rpc" },
        { key: "Accept", value: "application/json" },
      ],
      urlParams: null,
      responseType: Http_ResponseType.TEXT,
      body: RpcData.from(input.request).stringify()
    },
  }).unwrapOrElse((e: string) => {
    throw new Error(e);
  });

  if (httpResponse == null) {
    throw new Error("Did not receive HTTP response");
  }

  // handle json rpc error
  if (httpResponse.status == 400 || httpResponse.status == 404 || httpResponse.status == 500) {
    // TODO: how to handle json rpc notification (i.e. no request id) when error occurs?fi
    if (!httpResponse.body) {
      // handle unexpected missing response body
      const id: i32 = input.request.id.isNull ? I32.MIN_VALUE : input.request.id.value;
      return {
        result: null,
        error: handleUnspecifiedRpcError(httpResponse),
        id,
      };
    }
    return Response.fromJson(JSON.parse<string>(httpResponse.body!));
  }

  // handle json rpc success
  if (httpResponse.status >= 200 && httpResponse.status <= 299) {
    if (input.request.id.isNull) {
      // response was not requested
      return null;
    }
    if (!httpResponse.body) {
      // handle unexpected missing response body
      return {
        result: null,
        error: null,
        id: input.request.id.value
      };
    }
    return Response.fromJson(JSON.parse<string>(httpResponse.body!));
  }

  throw new Error(`Unexpected HTTP response status: ${httpResponse.status}`);
}

