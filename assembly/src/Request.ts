import { Body } from "./Body";
import { Headers } from "./Headers";

export class RequestInit {
    method: string | null = null;
    headers: Array<Array<string>> | null = null;
    //subHeaders: Array<string> | null = null;
    body: ArrayBuffer | null = null;
    mode: string | null = null;
    // TODO torch2424 (6/9/20): Credentials
    // TODO torch2424 (6/9/20): Cache
    // TODO torch2424 (6/9/20): Redirect
    // TODO torch2424 (6/9/20): Referrer
    // TODO torch2424 (6/9/20): Integrity
}

export class Request extends Body {
    public method!: string;
    public url!: string;
    public headers!: Headers;
    constructor(url: string, init: RequestInit | null = null) {
        if (init && init.body) {
            super(init.body);
        } else {
            super(null);
        }
        this.url = url;
        this.method = init!.method! || "GET";
        this.headers = new Headers();
    }
}