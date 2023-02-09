import { RequestInit } from "./Request";
import { Response, ResponseInit } from "./Response"

@external("env", "_fetchSync")
    
declare function fetchSync(url: string): ArrayBuffer;

const requestBuffer = new ArrayBuffer(2);
export function fetch(url: string, init: RequestInit): Response {
    const buffer = fetchSync(url);
    return new Response(buffer, new ResponseInit());
}

// [method, mode, length, headers, length, body]