_Warning: Currently, the application it's not production mode (which means that
is **not** minified) because when `mode` is equal to `"production"` in `webpack.config.js`,
Webpack v5 enables `TerserPlugin`, which breaks the interaction with WebAssembly_

## Available Scripts

In the project directory, you can run:

### `nvm install && nvm use`

Install and use the proper version of node.

### `yarn`

Install all dependencies.

### `yarn start`

Runs the app.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If you make edits, you will need to run `yarn build && yarn start` to see the changes<br />

## Learn More

To learn more about Polywrap, visit our [documentation page](https://docs.polywrap.io/).
