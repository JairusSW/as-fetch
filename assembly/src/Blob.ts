class BlobOptions {
    type!: string | null;
}
export class Blob {
    private _buffer!: ArrayBuffer;
    public size!: i32;
    public type!: string;
    constructor(array: ArrayBuffer, options: BlobOptions | null = null) {
        this.type = options?.type || "text/plain";
        this._buffer = array;
        this.size = array.byteLength;
    }
    @inline text(): string {
        return String.UTF8.decode(this._buffer);
    }
    @inline text16(): string {
        return String.UTF16.decode(this._buffer);
    }
    @inline arrayBuffer(): ArrayBuffer {
        return this._buffer;
    }
    @inline toString(): string {
        return "[object Blob]";
    }
    @inline slice(start: i32, end: i32, contentType: string | null = null) {
        return new Blob(this._buffer.slice(start, end), { type: contentType });
    }
}