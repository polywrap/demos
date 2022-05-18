import { HelloWorld_Query } from './w3' 
import { Web3ApiClient } from "@web3api/client-js"

function invokeClient() {
  const client = new Web3ApiClient()
  const result = HelloWorld_Query.logMessage({ message: "sup sup"}, client)

  result.then(t => console.log({ t })).catch(error => console.log({ error }))
}

document.getElementById('invoke').addEventListener('click', invokeClient)
