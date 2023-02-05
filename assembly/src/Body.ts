import { JSON } from "json-as";
import { Blob } from "./Blob";

@lazy const emptyBuffer = new ArrayBuffer(0);

export class Body {
    private _buffer: ArrayBuffer | null;
    public bodyUsed: boolean = false;
    constructor(body: ArrayBuffer | null = null) {
        this._buffer = body;
    }
    @inline arrayBuffer(): ArrayBuffer {
        this.bodyUsed = true;
        return this._buffer || emptyBuffer;
    }
    @inline blob(): Blob {
        this.bodyUsed = true;
        return new Blob(this._buffer || emptyBuffer);
    }
    @inline json<T>(): T {
        this.bodyUsed = true;
        return JSON.parse<T>(this.text());
    }
    @inline json16<T>(): T {
        this.bodyUsed = true;
        return JSON.parse<T>(this.text16());
    }
    @inline text(): string {
        this.bodyUsed = true;
        return String.UTF8.decode(this._buffer || emptyBuffer);
    }
    @inline text16(): string {
        this.bodyUsed = true;
        return String.UTF16.decode(this._buffer || emptyBuffer);
    }
}