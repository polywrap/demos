# Polywrap Demo: Fetch Metadata

This project demonstrates how a wrapper's Meta Manifest `web3api.meta.yaml` can be fetched using the Polywrap client. 

To see it in action, run the demo in development mode and enter a wrap URI. The demo will then display the contents of 
the Meta Manifest.

Some examples of valid URIs are:
* w3://ipfs/QmHASH
* w3://ens/sub.domain.eth
* w3://fs/directory/file.txt
* w3://uns/domain.crypto
* ens/sub.domain.eth
* ipfs/QmHASH

Breaking down the various parts of the URI, as it applies to [the URI standard](https://tools.ietf.org/html/rfc3986#section-3):
* **w3://** - URI Scheme: differentiates Polywrap URIs.
* **ipfs/** - URI Authority: allows the Polywrap URI resolution algorithm to determine an authoritative URI resolver.
* **sub.domain.eth** - URI Path: tells the Authority where the API resides.

## Available Scripts

In the project directory, you can run:

### `nvm install && nvm use`

Install and use the proper version of node.

### `yarn`

Install all dependencies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Learn More

To learn more about Polywrap, visit our [documentation page](https://docs.polywrap.io/).
