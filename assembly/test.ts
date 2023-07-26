import { fetch } from "./src/fetch";

// Make sure to add this line!
export { responseHandler } from "./src/fetch";

export function main(): void {
    fetch("http://api.quotable.io/random", {
        method: "GET",
        mode: "no-cors",
        headers: [],
        body: null
    }).then((response) => {
        let text = response.text();
        // response.text16() is faster :D
        console.log("Response: " + text);
    });
}