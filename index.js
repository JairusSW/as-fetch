const fs = require("fs");
const loader = require("@assemblyscript/loader");
const FetchImport = require("./imports")
const Fetch = new FetchImport()
const imports = {
    ...Fetch.wasmImports
};
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);
Fetch.wasmExports = wasmModule.exports
wasmModule.exports._start()
