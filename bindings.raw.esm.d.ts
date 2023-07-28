export class FetchHandler {
    public imports: {
        _fetchGET(url: string, headers: string[][], callbackID: string): void;
        _fetchPOST(url: string, headers: string[][], body: ArrayBuffer, callbackID: string): void;
    };
    constructor(fetchImpl: any);
    init(exp: WebAssembly.Exports): void;
}