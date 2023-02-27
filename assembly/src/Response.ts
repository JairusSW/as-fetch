import { Body } from "./Body";
import { Headers } from "./Headers";
import { Status } from "./Status";

export class ResponseInit {
    status: number = 200;
    headers: Headers | null = null;
    url: string | null = null;
    redirected: boolean = false
}

export class Response extends Body {
    public url: string;
    public status: i32 = 0;
    public statusText!: string;
    public headers: Headers;
    public redirected: boolean = false;
    public ok: boolean = true;
    constructor(body: ArrayBuffer | null, init: ResponseInit) {
        super(body);
        this.headers = init.headers || new Headers();
        this.url = init.url || "";
        this.redirected = init.redirected;
        this.ok = this.status >= 200 && this.status < 300;
    }
}