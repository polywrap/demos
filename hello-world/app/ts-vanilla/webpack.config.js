const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./dist/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
    fallback: {
      fs: require.resolve("browserify-fs"),
    },
  },
  plugins: [
    new NodePolyfillPlugin({
      excludeAliases: [
        "console",
        "assert",
        "constants",
        "crypto",
        "domain",
        "events",
        "http",
        "https",
        "os",
        "punycode",
        "querystring",
        "string_decoder",
        "sys",
        "timers",
        "tty",
        "url",
        "util",
        "vm",
        "zlib",
      ],
    }),
  ],
};
