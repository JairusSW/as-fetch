export class FetchHandler {
    public imports: {
        _fetchGET(url: string, headers: string[][], callbackID: number): void;
        _fetchPOST(url: string, headers: string[][], body: ArrayBuffer, callbackID: number): void;
    };
    constructor(fetchImpl: any);
    init(exp: WebAssembly.Exports): void;
}