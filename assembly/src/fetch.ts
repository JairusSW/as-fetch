//@external("env", "_fetchSync")
//declare function _fetchSync(url: string): ArrayBuffer;
@external("fetch", "_fetchAsync")
declare function _fetchAsync(url: string, method: i32): void;

import { RequestInit } from "./Request";
import { Response, ResponseInit } from "./Response"
/*
const requestBuffer = new ArrayBuffer(2);
function fetchSync(url: string, init: RequestInit | null = null): Response {
    const buffer = _fetchSync(url);
    return new Response(buffer, new ResponseInit());
}*/

let _callback: (value: Response) => void = (value) => { };

export function responseHandler(buffer: ArrayBuffer): void {
    _callback(new Response(buffer, new ResponseInit()));
}

class Fetch {
    constructor(private url: string, private init: RequestInit | null = null) {}
    then(onfulfilled: (value: Response) => void): Fetch {
        _callback = onfulfilled;
        _fetchAsync(this.url, 0);
        return this;
    }
}

function methodToNum(method: string): i32 {
    switch (method) {
        case "GET": {
            return 0;
        }
        default: {
            return 0;
        }
    }
}

export function fetch(url: string, init: RequestInit | null = null): Fetch {
    return new Fetch(url, init);
}

// [method, mode, length, headers, length, body]