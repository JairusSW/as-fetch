# Fetch

A fully asynchronous or optionally synchronous `fetch` implementation for AssemblyScript

## Installation

```bash
npm install as-fetch
```

## Setting up (Asynchronous Fetch)

Add the fetch imports to your instantiation file.

**Raw Bindings**

```js
import { readFileSync } from "fs";

import { instantiate } from "./build/test.js";
import { FetchHandler } from "as-fetch/bindings.raw.esm.js";

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

// You can use your own implementation of fetch
const Fetch = new FetchHandler(fetch);

instantiate(compiled, { ...Fetch.imports }).then((exports) => {
  Fetch.init(exports, exports.main);
  exports.main();
});
```

**ESM Bindings**

```js
import { main, responseHandler } from "./build/test.js";
// Fetch API must exist on the host
fetch.setResponseHandler = responseHandler;
main();
```

## Setting up (Synchronous Fetch)

Add the transform to your `asc` command (e.g. in package.json)

```bash
--transform as-fetch/transform
```

Alternatively, add it to your `asconfig.json`

```json
{
  "options": {
    "transform": ["as-fetch/transform"]
  }
}
```

Finally, add the fetch imports to your instantiation file.

**Raw Bindings**

```js
import { readFileSync } from "fs";

import { instantiate } from "./build/test.js";
import { FetchHandler } from "as-fetch/bindings.raw.esm.js";

const binary = readFileSync("./build/test.wasm");
const compiled = new WebAssembly.Module(binary);

// You can use your own implementation of fetch
const Fetch = new FetchHandler(fetch);

instantiate(compiled, { ...Fetch.imports }).then((exports) => {
  Fetch.init(exports, exports.main);
  exports.main();
});
```

**ESM Bindings are not supported for sync fetch. Use Raw instead**

## Usage

**Asynchronous Fetch**

```js
import { fetch } from "as-fetch/assembly";

// Make sure to add this line! (For async only)
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

**Synchronous Fetch**

```js
import { fetchSync } from "as-fetch/sync";

const response = fetchSync("http://api.quotable.io/random", {
  method: "GET",
  mode: "no-cors",
  headers: [],
  body: null,
});

let body = response.text();
console.log("Ok: " + response.ok.toString());
console.log("Status: " + response.status.toString());
console.log("Status Text: " + response.statusText);
console.log("Redirected: " + response.redirected.toString());
console.log("Response: " + body);
```
