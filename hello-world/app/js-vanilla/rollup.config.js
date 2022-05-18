import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from "rollup-plugin-replace"
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import copy from 'rollup-plugin-copy'

export default {
    input: 'src/index.js',
    output: {
        file: 'public/bundle.js',
        format: 'umd',
        name: 'bundle'
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'production' )
        }),
        commonjs({
            transformMixedEsModules: true
        }),
        nodeResolve({
            browser: true,
            preferBuiltins: false,
            extensions: ['.js', '.ts']
        }),
        nodePolyfills(),
        json(),
        typescript({
            rollupCommonJSResolveHack: true
        }),
        copy({
            targets: [
                { src: 'src/index.html', dest: 'public' }
            ]
        })
    ],
  };