import { fetch } from "./fetch";

fetch("http://localhost:3000/api-get?name=as-fetch", {
    method: "GET",
    mode: "no-cors",
    headers: [],
    body: null
}).then((response) => {
    const text = response.text();
    trace("Response: " + text);
});