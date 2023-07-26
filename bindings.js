class FetchImport {
    constructor() {
        this.wasmImports = {
            fetch: {
                _fetchAsync(url, method, callbackID) {
                    fetch(url, {
                        method: "GET"
                    }).then(async (res) => {
                        const value = await res.arrayBuffer();
                        this._exports.responseHandler(value, callbackID);
                    });
                }
            }
        }
    }
    set wasmExports(exp) {
        this._exports = exp;
    }
    get wasmExports() {
        return this._exports;
    }
}

module.exports = FetchImport;