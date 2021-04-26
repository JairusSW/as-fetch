let crossFetch = (() => {

    if (typeof require === 'function') return require('cross-fetch').fetch

    return fetch

})()

// ^ Isomorphic Fetch

class ImportManager {
    
    constructor() {

        this._exports = null

        this.wasmImports = {
            Promise: {
                _defer: callbackIndex => {
                    Promise.resolve().then(this.getFn(callbackIndex))
                },
                _deferWithArg: (callbackIndex, argPtr) => {
                    // Prevent the thing pointed to by argPtr from being collectd, because the callback needs it later.
                    this.__pin(argPtr)
    
                    Promise.resolve().then(() => {
                        // At this point, is the callback collected? Did we need to
                        // __pin the callback too, and it currently works by
                        // accident?
    
                        this.getFn(callbackIndex)(argPtr)
    
                        this.__unpin(argPtr)
                    })
                }
            },
            fetch: {
                // Imports...
                _fetch: (url, method, mode, body, headers, pointer) => {

                    const id = this._exports.Uint8Array_ID

                    const callback = this.getFn(pointer)
                    //--> Get callback via pointer

                    method = this._exports.__getString(method)

                    mode = this._exports.__getString(mode)

                    headers = this._exports.__getString(headers)

                    if (headers.startsWith(',')) headers = headers.slice(1, headers.length)

                    headers = `[${headers}]`
                    
                    body = (method === 'GET') ? null : this._exports.__getUint8Array(body)

                    crossFetch(this._exports.__getString(url), {
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
            },
            console: {
                consoleDebug: (message) => {
        
                    console.debug(this._exports.__getString(message))
        
                },
                consoleError: (message) => {
        
                    console.error(this._exports.__getString(message))
        
                },
                consoleInfo: (message) => {
        
                    console.info(this._exports.__getString(message))
        
                },
                consoleTime: (label) => {
        
                    console.time(this._exports.__getString(label))
        
                },
                consoleTimeEnd: (label) => {
        
                    console.timeEnd(this._exports.__getString(label))
        
                },
                consoleTimeLog: (label) => {
        
                    console.timeLog(this._exports.__getString(label))
        
                },
                consoleWarn: (message) => {
        
                    console.warn(this._exports.__getString(message))
        
                },
                consoleLog: (message) => {
        
                    console.log(this._exports.__getString(message))
        
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
        if (!this._exports['table']) return () => {}
		return this._exports.table.get(fnIndex)
	}
}

module.exports = ImportManager