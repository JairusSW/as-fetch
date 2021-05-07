class ImportManager {
    
    constructor() {

        this._exports = null

        this.wasmImports = {
            fetch: {
                // Imports...
                _fetch: (url, method, mode, body, headers, pointer, id) => {

                    const callback = this.getFn(pointer)
                    //--> Get callback via pointer

                    method = this._exports.__getString(method)

                    mode = this._exports.__getString(mode)

                    headers = this._exports.__getString(headers)

                    if (headers.startsWith(',')) headers = headers.slice(1, headers.length)

                    headers = `[${headers}]`
                    
                    body = (method === 'GET') ? null : this._exports.__getUint8Array(body)

                    fetch(this._exports.__getString(url), {
                        method: method,
                        mode: mode,
                        body: body,
                        headers: (headers === '') ? null : JSON.parse(headers)
                    }).then(async (response) => {

                        const body = await response.arrayBuffer()

                        callback(this._exports.__newArray(id, Buffer.from(body)), response.status, this._exports.__newString(response.url), response.redirected ? 1 : 0)
                        //--> Execute callback on finish. Returning an ArrayBuffer is the fastest.

                    })

                }
            }
        }
    }

    get wasmExports() {
		return this._exports
	}
	set wasmExports(e) {
		this._exports = e
        this._exports.__getString = e.__getString
        this._exports.__newString = e.__newString
        this._exports.__newArray = e.__newArray
        this._exports.__getArray = e.__getArray
	}

	getFn(fnIndex) {
		if (!this.wasmExports)
			throw new Error(
				'Make sure you set .wasmExports after instantiating the Wasm module but before running the Wasm module.',
			)
        if (!this._exports['table']) return () => {
            throw new Error('Could not access table. Did you add the --exportTable flag?')
        }
		return this._exports.table.get(fnIndex)
	}
}

module.exports = ImportManager