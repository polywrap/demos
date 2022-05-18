import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import nodePolyfills from "rollup-plugin-polyfill-node";

export default {
  input: "src/index.js",
  output: {
    file: "public/main.js",
    format: "umd",
    name: "main",
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
    typescript({
      rollupCommonJSResolveHack: true,
    }),
  ],
};
