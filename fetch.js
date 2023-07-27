export function _fetchGET(url, headers, callbackID) {
    fetch(url, {
        method: "GET",
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        adaptedExports.responseHandler(body, res.status, res.redirected, callbackID);
    });
}
export function _fetchPOST(url, headers, body, callbackID) {
    fetch(url, {
        method: "POST",
        body: body,
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        adaptedExports.responseHandler(body, res.status, res.redirected, callbackID);
    });
}
console.log("Hi from fetch.js")