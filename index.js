import { readFileSync } from "fs";

import { main } from "./build/test.js"
import { FetchHandler } from "./bindings.raw.esm.js";
main()
//const binary = readFileSync("./build/test.wasm");
//const compiled = new WebAssembly.Module(binary);
/*
const asfetch = new FetchHandler(fetch);

instantiate(compiled, { ...asfetch.imports }).then(exports => {
    asfetch.init(exports);
    exports.main();
});*/