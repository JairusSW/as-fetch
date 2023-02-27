let wasmExports = null;
let memoryU16 = null;
let memoryU32 = null;
class FetchImport {
    constructor() {
        this.wasmImports = {
            fetch: {
                _fetchAsync(url, method) {
                    url = lowerString(url);
                    fetch(url, {
                        method: "GET"
                    }).then(async (res) => {
                        const value = await res.text();
                        const length = value.length;
                        const pointer = wasmExports.__new(length << 1, 2) >>> 0;
                        for (let i = 0; i < length; ++i) memoryU16[(pointer >>> 1) + i] = value.charCodeAt(i);
                        wasmExports.responseHandler(pointer);
                    });
                }
            }
        }
    }
    set wasmExports(exp) {
        wasmExports = exp;
        memoryU16 = new Uint16Array(exp.memory.buffer);
        memoryU32 = new Uint32Array(exp.memory.buffer);
    }
    get wasmExports() {
        return this._exports;
    }
}

function lowerString(ptr) {
    if (!ptr) return null;
    const end = ptr + memoryU32[ptr - 4 >>> 2] >>> 1;
    let start = ptr >>> 1;
    let string = "";
    while (end - start > 1024) string += String.fromCharCode(...memoryU16.subarray(start, start += 1024));
    return string + String.fromCharCode(...memoryU16.subarray(start, end));
}
module.exports = FetchImport;