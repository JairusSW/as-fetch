@external("as-fetch", "_fetchGET")
declare function _fetchGET(url: string, mode: i32, headers: string[][], callbackID: i32): void;

@external("as-fetch", "_fetchPOST")
declare function _fetchPOST(url: string, mode: i32, headers: string[][], body: ArrayBuffer, callbackID: i32): void;

@external("as-fetch", "_fetchGETSync")
declare function _fetchGETSync(url: string, mode: i32, headers: string[][]): usize;

@external("as-fetch", "_fetchPOSTSync")
declare function _fetchPOSTSync(url: string, mode: i32, headers: string[][], body: ArrayBuffer): usize;

import { Headers } from "./Headers";
import { Modes } from "./Mode";
import { RequestInit } from "./Request";
import { Response, ResponseInit } from "./Response";

export function responseHandler(body: ArrayBuffer, statusCode: i32, redirected: boolean, callbackID: i32): void {
    call_indirect(callbackID, new Response(body, {
        status: statusCode,
        headers: new Headers(),
        url: null,
        redirected: redirected
    }));
}

export class Fetch {
    constructor(private url: string, private init: RequestInit | null = null) {
        if (!this.init) {
            this.init = new RequestInit();
            this.init!.method = "GET";
            init!.mode = "cors";
        }
    }
    then(onfulfilled: (value: Response) => void): Fetch {
        if (this.init!.method == "GET") {
            _fetchGET(this.url, modeToNum(this.init!.mode), this.init!.headers!, load<i32>(changetype<usize>(onfulfilled)));
        } else if (this.init!.method == "POST") {
            _fetchPOST(this.url, modeToNum(this.init!.mode), this.init!.headers!, this.init!.body!, load<i32>(changetype<usize>(onfulfilled)));
        }
        return this;
    }
}

function methodToNum(method: string): i32 {
    if (method == "GET") return 0;
    else if (method == "POST") return 1;
    return 0;
}

function modeToNum(mode: string | null): i32 {
    if (mode == "cors") return Modes.cors;
    if (mode == "no-cors") return Modes.no_cors;
    if (mode == "same-origin") return Modes.same_origin;
    if (mode == "navigate") return Modes.navigate;
    // Default to cors
    return 1;
}

export function fetch(url: string, init: RequestInit | null = null): Fetch {
    return new Fetch(url, init);
}

export function fetchSync(url: string, init: RequestInit | null = null): Response {
    if (!init) init = new RequestInit();
    if (init.method === "GET") {
        return new Response(changetype<ArrayBuffer>(_fetchGETSync(url, modeToNum(init.mode), init.headers || [])), new ResponseInit());
    } else {
        return new Response(changetype<ArrayBuffer>(_fetchPOSTSync(url, modeToNum(init.mode), init.headers || [], init.body!)), new ResponseInit());
    }
}