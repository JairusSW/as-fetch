export function _fetchGET(url: string, mode: number, headers: string[][], callbackID: number): void;

export function _fetchPOST(url: string, mode: number, headers: string[][], body: ArrayBuffer, callbackID: number): void;

export function _fetchGETSync(url: string, mode: number, headers: string[][]): void;

export function _fetchPOSTSync(url: string, mode: number, headers: string[][], body: ArrayBuffer): void;

export function _initAsyncify(frame_ptr: number, stack_ptr: number): void;