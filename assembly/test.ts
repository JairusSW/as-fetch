import { fetch } from ".";

fetch("http://api.quotable.io/random", {
    method: "GET",
    mode: "no-cors",
    headers: [],
    body: null
}).then((response) => {
    const text = response.text();
    trace("Response: " + text);
});