class BlobOptions {
    type!: string | null;
}
export class Blob {
    public size!: i32;
    public type!: string;
    constructor(private _buffer: ArrayBuffer, options: BlobOptions | null = null) {
        if (options) this.type = options.type!
        else "text/plain";
        this.size = this._buffer.byteLength;
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
    @inline slice(start: i32, end: i32, contentType: string | null = null): Blob {
        return new Blob(this._buffer.slice(start, end), { type: contentType });
    }
}