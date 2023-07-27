// Bindings for ESM auto-generated bindings. Uses the fetch global to access responseHandler on the way out. May want to change this to a indirect table call.
export function _fetchGET(url, mode, headers, callbackID) {
    fetch(url, {
        method: "GET",
        mode: modeToString(mode),
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        if (!fetch.setResponseHandler) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file.");
        fetch.setResponseHandler(body, res.status, res.redirected, callbackID);
    });
}

export function _fetchPOST(url, mode, headers, body, callbackID) {
    fetch(url, {
        method: "POST",
        mode: modeToString(mode),
        body: body,
        headers: headers
    }).then(async (res) => {
        const body = await res.arrayBuffer();
        if (!fetch.setResponseHandler) throw new Error("responseHandler was not exported from entry file. Add export { responseHandler } from \"as-fetch\" to your entry file.");
        fetch.setResponseHandler(body, res.status, res.redirected, callbackID);
    });
}

function modeToString(mode) {
    if (mode == 1) return "cors";
    if (mode == 2) return "no-cors";
    if (mode == 3) return "same-origin";
    if (mode == 4) return "navigate";
    return null;
}