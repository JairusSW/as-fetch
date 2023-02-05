export class Headers {
    private _headers: Map<string, string[]> = new Map();
    constructor(entries: string[]) {
        for (let pos = 0; pos < entries.length; pos += 2) {
            this._headers.set(unchecked(entries[pos]), [unchecked(entries[pos + 1])]);
        }
    }
    @inline get(name: string): string | null {
        return this._headers.has(name) ? this._headers.get(name)[0] : null;
    }
    @inline set(name: string, value: string): void {
        this._headers.set(name, [value]);
    }
    @inline append(name: string, value: string): void {
        if (!this._headers.has(name)) return;
        const headers = this._headers.get(name);
        headers.push(value);
        this._headers.set(name, headers);
    }
}