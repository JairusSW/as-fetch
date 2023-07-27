let _responseHandler;

export class FetchHandler {
    constructor(fetchImpl) {
        if (!fetchImpl) {
            if (!fetch) throw new Error("No implementation of fetch provided and no implementation was found!");
            fetchImpl = fetch;
        }
        this.imports = {
            fetch: {
                _fetchGET(url, headers, callbackID) {
                    fetchImpl(url, {
                        method: "GET",
                        headers: headers
                    }).then(async (res) => {
                        const body = await res.arrayBuffer();
                        _responseHandler(body, res.status, res.redirected, callbackID);
                    });
                },
                _fetchPOST(url, headers, body, callbackID) {
                    fetchImpl(url, {
                        method: "POST",
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