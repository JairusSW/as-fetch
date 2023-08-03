let _fetchGETSyncPtr = 0;
let _fetchPOSTSyncPtr = 0;

let ASYNCIFY_PTR = 16;
let ASYNCIFY_MEM;
let EXPORTS;
let MAIN_FUNCTION;

// Asyncify's call frame is 8 bytes long. It has an 8 byte header and an 8 byte layer to handle freezing, unfreezing, and statuses.
// Two i32s.
export class FetchHandler {
    constructor(fetchImpl) {
        if (!fetchImpl) {
            if (!fetch) throw new Error("No implementation of fetch provided and no implementation was found!");
            fetchImpl = fetch;
        }
        this.imports = {
            "as-fetch": {
                _initAsyncify(frame_ptr, stack_ptr) {
                    if (!EXPORTS["asyncify_get_state"]) throw new Error("Asyncify not enabled. Did you enable the transform?");
                    ASYNCIFY_PTR = frame_ptr;
                    ASYNCIFY_MEM[ASYNCIFY_PTR >> 2] = ASYNCIFY_PTR + 8;
                    // I don't know if I need to reserve all this memory...
                    ASYNCIFY_MEM[ASYNCIFY_PTR + 4 >> 2] = stack_ptr;
                },
                _fetchPOSTSync(url, mode, headers, body) {
                    const currentState = EXPORTS.asyncify_get_state();
                    if (currentState === 2) {
                        //console.log("asyncify_stop_rewind() [resume wasm]");
                        EXPORTS.asyncify_stop_rewind();
                        return _fetchPOSTSyncPtr;
                    } else if (currentState === 0) {
                        //console.log("asyncify_start_unwind() [pause wasm]");
                        EXPORTS.asyncify_start_unwind(ASYNCIFY_PTR);
                        fetchImpl(url, {
                            method: "POST",
                            mode: modeToString(mode),
                            headers: headers,
                            body: body
                        }).then(async (res) => {
                            //console.log("asyncify_stop_unwind() [unpause wasm]");
                            EXPORTS.asyncify_stop_unwind();
                            const value = await res.arrayBuffer();
                            _fetchPOSTSyncPtr = EXPORTS.__new(value.byteLength, 1);
                            new Uint8Array(EXPORTS.memory.buffer).set(new Uint8Array(value), _fetchPOSTSyncPtr);
                            //console.log("asyncify_start_rewind() [resuming wasm]");
                            EXPORTS.asyncify_start_rewind(ASYNCIFY_PTR);
                            MAIN_FUNCTION();
                        });
                    }
                },
                _fetchGETSync(url, mode, headers) {
                    const currentState = EXPORTS.asyncify_get_state();
                    if (currentState === 2) {
                        //console.log("asyncify_stop_rewind() [resume wasm]");
                        EXPORTS.asyncify_stop_rewind();
                        return _fetchGETSyncPtr;
                    } else if (currentState === 0) {
                        //console.log("asyncify_start_unwind() [pause wasm]");
                        EXPORTS.asyncify_start_unwind(ASYNCIFY_PTR);
                        fetchImpl(url, {
                            method: "GET",
                            mode: modeToString(mode),
                            headers: headers
                        }).then(async (res) => {
                            //console.log("asyncify_stop_unwind() [unpause wasm]");
                            EXPORTS.asyncify_stop_unwind();
                            const value = await res.arrayBuffer();
                            _fetchGETSyncPtr = EXPORTS.__new(value.byteLength, 1);
                            new Uint8Array(EXPORTS.memory.buffer).set(new Uint8Array(value), _fetchGETSyncPtr);
                            //console.log("asyncify_start_rewind() [resuming wasm]");
                            EXPORTS.asyncify_start_rewind(ASYNCIFY_PTR);
                            MAIN_FUNCTION();
                        });
                    }
                },
                _fetchGET(url, mode, headers, callbackID) {
                    if (!EXPORTS["responseHandler"]) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file.");
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
                    if (!EXPORTS["responseHandler"]) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file.");
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