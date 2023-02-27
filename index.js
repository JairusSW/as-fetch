import { readFileSync } from "fs";
import { FetchImport } from "./imports.esm.js";

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

function lowerString(ptr) {
    if (!ptr) return null;
    const end = ptr + memoryU32[ptr - 4 >>> 2] >>> 1;
    let start = ptr >>> 1;
    let string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
}

const fetchImports = new FetchImport();

const imports = {
    ...fetchImports.wasmImports,
    env: {
        writeString(ptr) {
            console.log(lowerString(ptr));
        },
        abort() { }
    }
}

const { exports } = new WebAssembly.Instance(compiled, imports);

fetchImports.wasmExports = exports;
const memoryU16 = new Uint16Array(exports.memory.buffer);
const memoryU32 = new Uint32Array(exports.memory.buffer);

exports.main();