import { readFileSync } from "fs";

import { instantiate } from "./build/test.js";
import { FetchHandler } from "./bindings.raw.esm.js";

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

// You can use your own implementation of fetch
const Fetch = new FetchHandler(fetch);

instantiate(compiled, { ...Fetch.imports }).then((exports) => {
    Fetch.init(exports, exports.main);
    exports.main();
});