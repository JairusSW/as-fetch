const fs = require("fs");
const loader = require("@assemblyscript/loader");
const FetchImports = require('./imports')
const Fetch = new FetchImports()
const imports = {
    ...Fetch.wasmImports
};
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);
Fetch.wasmExports = wasmModule.exports
//module.exports = wasmModule.exports;
wasmModule.exports.test()
/*
fetch().then((res) => {

    res.blob()
})*/