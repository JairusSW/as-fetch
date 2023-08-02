@external("as-fetch", "_fetchGETSync")
declare function _fetchGETSync(url: string, mode: i32, headers: string[][]): usize;

@external("as-fetch", "_fetchPOSTSync")
declare function _fetchPOSTSync(url: string, mode: i32, headers: string[][], body: ArrayBuffer): usize;

@external("as-fetch", "_initAsyncify")
declare function _initAsyncify(asyncify_data_ptr: usize, stack_pointer: usize): void;

import { Modes } from "./assembly/src/Mode";
import { RequestInit } from "./assembly/src/Request";
import { Response, ResponseInit } from "./assembly/src/Response";

let ASYNCIFY_INITIALIZED = false;

export function fetchSync(url: string, init: RequestInit | null = null): Response {
    if (!init) init = new RequestInit();
    if (!ASYNCIFY_INITIALIZED) {
        _initAsyncify(memory.data(8, 16), __stack_pointer);
        ASYNCIFY_INITIALIZED = true;
    }
    if (init.method === "GET") {
        return new Response(changetype<ArrayBuffer>(_fetchGETSync(url, modeToNum(init.mode), init.headers || [])), new ResponseInit());
    } else {
        return new Response(changetype<ArrayBuffer>(_fetchPOSTSync(url, modeToNum(init.mode), init.headers || [], init.body!)), new ResponseInit());
    }
}

function modeToNum(mode: string | null): i32 {
    if (mode == "cors") return Modes.cors;
    if (mode == "no-cors") return Modes.no_cors;
    if (mode == "same-origin") return Modes.same_origin;
    if (mode == "navigate") return Modes.navigate;
    // Default to cors
    return 1;
}