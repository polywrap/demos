import { Web3ApiClient } from "@web3api/client-js";

export async function speak(
  uri: string,
  client: Web3ApiClient
): Promise<string> {
  const { data, errors } = await client.query<{
    speak: string
  }>({
    uri: uri,
    query: `query {
      speak()
    }`
  });

  if (errors || !data) {
    throw errors;
  }

  return data.speak;
}