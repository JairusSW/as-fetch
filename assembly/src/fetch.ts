@external("fetch", "_fetchGET")
declare function _fetchGET(url: string, headers: string[][], callbackID: i32): void;

@external("fetch", "_fetchPOST")
declare function _fetchPOST(url: string, headers: string[][], body: ArrayBuffer, callbackID: i32): void;

import { Headers } from "./Headers";
import { RequestInit } from "./Request";
import { Response } from "./Response"

export function responseHandler(body: ArrayBuffer, statusCode: i32, redirected: boolean, callbackID: i32): void {
    call_indirect(callbackID, new Response(body, {
        status: statusCode,
        headers: new Headers(),
        url: null,
        redirected: redirected
    }));
}

class Fetch {
    constructor(private url: string, private init: RequestInit | null = null) {
        if (!this.init) {
            this.init = new RequestInit();
            this.init!.method = "GET";
        }
    }
    then(onfulfilled: (value: Response) => void): Fetch {
        if (this.init!.method == "GET") {
            _fetchGET(this.url, this.init!.headers!, load<i32>(changetype<usize>(onfulfilled)));
        } else if (this.init!.method == "POST") {
            _fetchPOST(this.url, this.init!.headers!, this.init!.body!, load<i32>(changetype<usize>(onfulfilled)));
        }
        return this;
    }
}

function methodToNum(method: string): i32 {
    if (method == "GET") return 0;
    else if (method == "POST") return 1;
    return 0;
}

export function fetch(url: string, init: RequestInit | null = null): Fetch {
    return new Fetch(url, init);
}

// [method, mode, length, headers, length, body]