"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_js_1 = require("@web3api/client-js");
var ipfs_plugin_js_1 = require("@web3api/ipfs-plugin-js");
exports.default = new client_js_1.Web3ApiClient({
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
