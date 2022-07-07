"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_js_1 = require("@polywrap/client-js");
var ipfs_plugin_js_1 = require("@polywrap/ipfs-plugin-js");
exports.default = new client_js_1.PolywrapClient({
    plugins: [
        {
            uri: "w3://ens/ipfs.web3api.eth",
            plugin: ipfs_plugin_js_1.ipfsPlugin({
                provider: client_js_1.defaultIpfsProviders[0],
                fallbackProviders: client_js_1.defaultIpfsProviders.slice(1),
            }),
        }
    ]
});
