# Fetch

A fully asynchronous and performant `fetch` implementation for AssemblyScript that aims to bring the full `fetch` api along.

## Installation

```bash
npm install as-fetch
```

## Setting up

Add the fetch imports to your instantiation file.

**Raw Bindings**
```js
import { readFileSync } from "fs";

import { instantiate } from "./build/test.js"
import { FetchHandler } from "./bindings.raw.esm.js";

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

// You can use your own implementation of fetch
const Fetch = new FetchHandler(fetch);

instantiate(compiled, { ...Fetch.imports }).then(exports => {
    Fetch.init(exports);
    exports.main();
});
```

**ESM Bindings**
```js
import { main, responseHandler } from "./build/test.js"
// Fetch API must exist on the host
fetch.setResponseHandler = responseHandler;
main();
```
## Usage

```js
import { fetch } from "as-fetch/assembly";

// Make sure to add this line!
export { responseHandler } from "as-fetch/assembly";

fetch("http://api.quotable.io/random", {
  method: "GET",
  mode: "no-cors",
  headers: [],
  body: null,
}).then((response) => {
  let body = response.text();
  console.log("Ok: " + response.ok.toString());
  console.log("Status: " + response.status.toString());
  console.log("Status Text: " + response.statusText);
  console.log("Redirected: " + response.redirected.toString());
  console.log("Response: " + body);
});
```