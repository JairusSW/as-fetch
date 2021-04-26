class BlobOptions {
    type: string | null = null
}
export class Blob {
    private _type: string = 'text/plain'
    private _buffer: Uint8Array
	constructor(blobParts: Uint8Array, options: BlobOptions) {

        this._buffer = blobParts

		if (typeof options.type === 'string') this._type = changetype<string>(options.type).toLowerCase().trim()

	}
	get size(): number {
		return this._buffer.length;
	}
	get type(): string {
		return this._type;
	}
	text(): string {
		return String.UTF8.decode(this._buffer.buffer);
	}
	arrayBuffer(): ArrayBuffer {
		return this._buffer.buffer
	}
	/*stream(): Readable {

	}*/
	toString(): string {
		return '[object Blob]';
	}
	slice(begin: number, end: number): ArrayBuffer {
        return this._buffer.slice(begin, end).buffer
	}
}
