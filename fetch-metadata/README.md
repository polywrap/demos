# Polywrap Demo: Fetch Metadata

This project demonstrates how a wrapper's Meta Manifest `polywrap.meta.yaml` can be fetched using the Polywrap client. 

To see it in action, either go to [fetchmetadata.demo.polywrap.io](https://fetchmetadata.demo.polywrap.io/) or run the demo in development mode and enter a wrap URI. The demo will then display the contents of 
the Meta Manifest.

Try these URIs to test it out:

Hello World Assemblyscript Wrapper: `wrap://ens/goerli/hello.as.demos.polywrap.eth`

Some examples of valid URIs are:
* wrap://ipfs/QmHASH
* wrap://ens/sub.domain.eth
* wrap://fs/directory/file.txt
* ens/sub.domain.eth
* ipfs/QmHASH

Breaking down the various parts of the URI, as it applies to [the URI standard](https://tools.ietf.org/html/rfc3986#section-3):
* **wrap://** - URI Scheme: differentiates Polywrap URIs.
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
