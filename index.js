import { readFileSync } from "fs";

import { instantiate } from "./build/test.js"
import { FetchHandler } from "./bindings.esm.js";

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

const asfetch = new FetchHandler(fetch);

instantiate(compiled, { ...asfetch.imports }).then(exports => {
    asfetch.init(exports);
    exports.main();
});