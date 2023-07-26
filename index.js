import { readFileSync } from "fs";
import { FetchImport } from "./imports.esm.js";

import { instantiate } from "./build/test.js"

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

const fetchImports = new FetchImport();

let responseHandler

instantiate(compiled, {
    fetch: {
        _fetchAsync(url, method) {
            console.log("url: " + url);
            fetch(url, {
                method: "GET"
            }).then(async (res) => {
                const value = await res.arrayBuffer();
                //const length = value.length;
                //const pointer = fetchImports.wasmExports.__new(length << 1, 2) >>> 0;
                //for (let i = 0; i < length; ++i) fetchImports.memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
                responseHandler(value);
            });
        }
    }
}).then(exports => {
    fetchImports.wasmExports = exports;
    fetchImports.memoryU16 = new Uint16Array(exports.memory.buffer);
    fetchImports.memoryU32 = new Uint32Array(exports.memory.buffer);
    responseHandler = exports.responseHandler
    exports.main();
});