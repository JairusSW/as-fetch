import { readFileSync } from "fs";

import { instantiate } from "./build/test.js"
import { FetchHandler } from "./bindings.raw.esm.js";

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

// You can use your own implementation of fetch
const Fetch = new FetchHandler(fetch);

instantiate(compiled, { ...Fetch.imports }).then(exports => {
    console.log(exports)
    Fetch.init(exports, exports.main);
    globalThis._exports = exports
    globalThis.memory32 = new Uint32Array(exports.memory.buffer);
    exports.main();
    exports.asyncify_stop_unwind(); 
});