export class FetchHandler {
    public imports: {
        _fetchGET(url: string, mode: number, headers: string[][], callbackID: number): void;
        _fetchPOST(url: string, mode: number, headers: string[][], body: ArrayBuffer, callbackID: number): void;
        _fetchGETSync(url: string, mode: number, headers: string[][]): void;
        _fetchPOSTSync(url: string, mode: number, headers: string[][], body: ArrayBuffer): void;
        _initAsyncify(frame_ptr: number, stack_ptr: number): void;
    };
    constructor(fetchImpl: any);
    init(exp: WebAssembly.Exports, mainFunc: Function): void;
}