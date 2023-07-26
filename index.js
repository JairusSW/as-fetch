import { readFileSync } from "fs";
import { FetchImport } from "./bindings.esm.js";

import { instantiate } from "./build/test.js"

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

const fetchImports = new FetchImport();

let responseHandler

instantiate(compiled, {
    fetch: {
        // Un-ordered responses
        _fetchGET(url, headers, callbackID) {
            fetch(url, {
                method: "GET",
                headers: headers
            }).then(async (res) => {
                const body = await res.arrayBuffer();
                responseHandler(body, res.status, res.redirected, callbackID);
            });
        },
        _fetchPOST(url, headers, body, callbackID) {
            fetch(url, {
                method: "POST",
                body: body,
                headers: headers
            }).then(async (res) => {
                const body = await res.arrayBuffer();
                responseHandler(body, res.status, res.redirected, callbackID);
            });
        }
    }
}).then(exports => {
    responseHandler = exports.responseHandler
    exports.main();
});