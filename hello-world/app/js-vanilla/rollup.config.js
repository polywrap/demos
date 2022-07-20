import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "index",
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    commonjs({
      transformMixedEsModules: true,
    }),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
      extensions: [".js", ".ts"],
    }),
    nodePolyfills(),
    json(),
  ],
};
