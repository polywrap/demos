import { PolywrapClient } from "@polywrap/client-js";
import { buildWrapper, runCLI } from "@polywrap/test-env-js";
import * as App from "../types/wrap";
import path from "path";

jest.setTimeout(500000);

describe("SubgraphQuery", () => {
  let client: PolywrapClient;

  const wrapperPath: string = path.join(
    path.resolve(__dirname),
    "..",
    "..",
    ".."
  );
  const wrapperUri = `fs/${wrapperPath}/build`;

  beforeAll(async () => {
    client = new PolywrapClient();

    await buildWrapper(wrapperPath);

    await runCLI({
      args: ["app", "codegen", "-c", "./wrap"],
      cwd: path.join(__dirname, "..", "types"),
    });
  });

  it("subgraph-query", async () => {
    const response = await App.SubgraphQuery_Module.subgraphQuery(
      {
        subgraphAuthor: "ensdomains",
        subgraphName: "ens",
        query: "{\ndomains(first: 5) {\nid\nname\nlabelName\nlabelhash\n}\n}",
      },
      client,
      wrapperUri
    );

    expect(response).toBeTruthy();
    expect(response.error).toBeFalsy();
    expect(response.data).not.toBeNull();
  });
});
