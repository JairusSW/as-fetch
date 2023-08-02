// Bindings for ESM auto-generated bindings. Uses the fetch global to access responseHandler on the way out. May want to change this to a indirect table call.
let _fetchGETSyncPtr = 0;
let _fetchPOSTSyncPtr = 0;

let ASYNCIFY_PTR = 16;
let ASYNCIFY_MEM;
let EXPORTS;

export function _fetchGET(url, mode, headers, callbackID) {
    if (!fetch["setResponseHandler"]) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file. Make sure to use fetch.setResponseHandler = responseHandler");
    fetch(url, {
        method: "GET",
        mode: modeToString(mode),
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        fetch.setResponseHandler(body, res.status, res.redirected, callbackID);
    });
}

export function _fetchPOST(url, mode, headers, body, callbackID) {
    if (!fetch["setResponseHandler"]) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file. Make sure to use fetch.setResponseHandler = responseHandler");
    fetch(url, {
        method: "POST",
        mode: modeToString(mode),
        body: body,
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        fetch.setResponseHandler(body, res.status, res.redirected, callbackID);
    });
}

export function _initAsyncify(frame_ptr, stack_ptr) {
    ASYNCIFY_PTR = frame_ptr;
    ASYNCIFY_MEM[ASYNCIFY_PTR >> 2] = ASYNCIFY_PTR + 8;
    // I don't know if I need to reserve all this memory...
    ASYNCIFY_MEM[ASYNCIFY_PTR + 4 >> 2] = stack_ptr;
}

export function _fetchPOSTSync(url, mode, headers, body) {
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
            new Uint8Array(EXPORTS.memory.buffer).set(new Uint8Array(value), _fetchGETSyncPtr);
            //console.log("asyncify_start_rewind() [resuming wasm]");
            EXPORTS.asyncify_start_rewind(ASYNCIFY_PTR);
            fetch.setMainFunction();
        });
    }
}

export function _fetchGETSync(url, mode, headers) {
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
            fetch.setMainFunction();
        });
    }
}

function modeToString(mode) {
    if (mode == 1) return "cors";
    if (mode == 2) return "no-cors";
    if (mode == 3) return "same-origin";
    if (mode == 4) return "navigate";
    return null;
}