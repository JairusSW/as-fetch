let _responseHandler;

class FetchHandler {
    constructor(fetchImpl) {
        if (!fetchImpl) {
            if (!fetch) throw new Error("No implementation of fetch provided and no implementation was found!");
            fetchImpl = fetch;
        }
        this.imports = {
            "as-fetch": {
                _fetchGET(url, mode, headers, callbackID) {
                    fetchImpl(url, {
                        method: "GET",
                        mode: modeToString(mode),
                        headers: headers
                    }).then(async (res) => {
                        const body = await res.arrayBuffer();
                        _responseHandler(body, res.status, res.redirected, callbackID);
                    });
                },
                _fetchPOST(url, mode, headers, body, callbackID) {
                    fetchImpl(url, {
                        method: "POST",
                        mode: modeToString(mode),
                        body: body,
                        headers: headers
                    }).then(async (res) => {
                        const body = await res.arrayBuffer();
                        _responseHandler(body, res.status, res.redirected, callbackID);
                    });
                }
            }
        }
    }
    init(exp) {
        if (!exp["responseHandler"]) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file.");
        _responseHandler = exp.responseHandler;
    }
}

function modeToString(mode) {
    if (mode == 1) return "cors";
    if (mode == 2) return "no-cors";
    if (mode == 3) return "same-origin";
    if (mode == 4) return "navigate";
    return null;
}

module.exports = FetchHandler;