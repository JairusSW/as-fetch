// Bindings for ESM auto-generated bindings. Uses the fetch global to access responseHandler on the way out. May want to change this to a indirect table call.
export function _fetchGET(url, headers, callbackID) {
    fetch(url, {
        method: "GET",
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        fetch.setResponseHandler(body, res.status, res.redirected, callbackID);
    });
}

export function _fetchPOST(url, headers, body, callbackID) {
    fetch(url, {
        method: "POST",
        body: body,
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        fetch.setResponseHandler(body, res.status, res.redirected, callbackID);
    });
}