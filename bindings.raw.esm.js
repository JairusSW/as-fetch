let _fetchGETSyncPtr = 0;
let _fetchPOSTSyncPtr = 0;

let ASYNCIFY_PTR = 16;
let ASYNCIFY_PAUSED = false;
let ASYNCIFY_MEM;
let EXPORTS;
let MAIN_FUNCTION;
let stack_pointer;

// 1008 bytes required
// 8 byte header
export class FetchHandler {
    constructor(fetchImpl) {
        if (!fetchImpl) {
            if (!fetch) throw new Error("No implementation of fetch provided and no implementation was found!");
            fetchImpl = fetch;
        }
        this.imports = {
            "as-fetch": {
                _initAsyncify(ptr, stack_ptr) {
                    stack_pointer = stack_ptr;
                    console.log("Initialized Asyncify i/o at " + ptr);
                    console.log("Stack pointer: " + stack_pointer);
                    new Int32Array(EXPORTS.memory.buffer, ASYNCIFY_PTR + 8).set([ASYNCIFY_PTR, stack_pointer]);
                },
                _fetchGETSync(url, mode, headers) {
                    const currentState = EXPORTS.asyncify_get_state();
                    if (currentState === 2) {
                        EXPORTS.asyncify_stop_rewind();
                        return _fetchPOSTSyncPtr;
                    } else if (currentState === 0) {
                        fetchImpl(url, {
                            method: "POST",
                            mode: modeToString(mode),
                            headers: headers
                        }).then(async (res) => {
                            const value = await res.arrayBuffer();
                            // @ts-ignore
                            _fetchPOSTSyncPtr = EXPORTS.__new(value.byteLength, 1);
                            new Uint8Array(EXPORTS.memory.buffer).set(new Uint8Array(value), _fetchPOSTSyncPtr);
                            // @ts-ignore
                            EXPORTS.asyncify_start_unwind(ASYNCIFY_PTR);
                            MAIN_FUNCTION();
                        });
                    }
                },
                _fetchGETSync(url, mode, headers) {
                    if (ASYNCIFY_PAUSED) {
                        // @ts-ignore
                        EXPORTS.asyncify_stop_rewind();
                        ASYNCIFY_PAUSED = false;
                        return _fetchGETSyncPtr;
                    } else {
                        ASYNCIFY_MEM[ASYNCIFY_PTR >> 2] = ASYNCIFY_PTR + 8;
                        ASYNCIFY_MEM[ASYNCIFY_PTR + 4 >> 2] = 1024;
                        // @ts-ignore
                        EXPORTS.asyncify_start_unwind(ASYNCIFY_PTR);
                        ASYNCIFY_PAUSED = true;
                    }
                    fetchImpl(url, {
                        method: "GET",
                        mode: modeToString(mode),
                        headers: headers
                    }).then(async (res) => {
                        const value = await res.arrayBuffer();
                        // @ts-ignore
                        _fetchGETSyncPtr = EXPORTS.__new(value.byteLength, 1);
                        new Uint8Array(EXPORTS.memory.buffer).set(new Uint8Array(value), _fetchGETSyncPtr);
                        // @ts-ignore
                        EXPORTS.asyncify_start_rewind(ASYNCIFY_PTR);
                        // SET THIS TO YOUR START FUNCTION
                        MAIN_FUNCTION();
                    });
                    return _fetchGETSyncPtr;
                },
                _fetchGET(url, mode, headers, callbackID) {
                    fetchImpl(url, {
                        method: "GET",
                        mode: modeToString(mode),
                        headers: headers
                    }).then(async (res) => {
                        const body = await res.arrayBuffer();
                        EXPORTS.responseHandler(body, res.status, res.redirected, callbackID);
                    });
                },
                _fetchPOST(url, mode, headers, body, callbackID) {
                    fetchImpl(url, {
                        method: "POST",
                        mode: modeToString(mode),
                        body: body,
                        headers: headers,
                    }).then(async (res) => {
                        const body = await res.arrayBuffer();
                        EXPORTS.responseHandler(body, res.status, res.redirected, callbackID);
                    });
                }
            }
        }
    }
    init(exp, entry) {
        if (!exp["responseHandler"]) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file.");
        EXPORTS = exp;
        MAIN_FUNCTION = entry;
        ASYNCIFY_MEM = new Uint32Array(exp.memory.buffer);
    }
}

function modeToString(mode) {
    if (mode == 1) return "cors";
    if (mode == 2) return "no-cors";
    if (mode == 3) return "same-origin";
    if (mode == 4) return "navigate";
    return null;
}