import { Http_Module, Http_Response, Http_ResponseType, Args_query, Response } from "./wrap";
import {handleUnspecifiedRpcError, requestToJsonString, responseFromJsonString} from "./utils";

export function query(args: Args_query): Response | null {
  const headers: Map<string, string> = new Map();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");
  const httpResponse: Http_Response | null = Http_Module.post({
    url: args.url,
    request: {
      headers,
      urlParams: null,
      responseType: Http_ResponseType.TEXT,
      body: requestToJsonString(args.request),
    },
  }).unwrapOrElse((e: string) => {
    throw new Error(e);
  });

  if (httpResponse == null) {
    throw new Error("Did not receive HTTP response");
  }

  // handle json rpc error
  if (httpResponse.status == 400 || httpResponse.status == 404 || httpResponse.status == 500) {
    if (!httpResponse.body) {
      // handle unexpected missing response body
      const id: string = args.request.id === null ? "" : args.request.id!;
      return {
        result: null,
        error: handleUnspecifiedRpcError(httpResponse),
        id,
      };
    }
    return responseFromJsonString(httpResponse.body!);
  }

  // handle json rpc success
  if (httpResponse.status >= 200 && httpResponse.status <= 299) {
    if (args.request.id ===  null) {
      // response was not requested
      return null;
    }
    if (!httpResponse.body) {
      throw new Error(`Missing response with successful HTTP status ${httpResponse.status}`)
    }
    return responseFromJsonString(httpResponse.body!);
  }

  throw new Error(`Unexpected HTTP response status: ${httpResponse.status}`);
}

