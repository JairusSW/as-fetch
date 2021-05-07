# Fetch

**The `fetch()` API brought to AssemblyScript**

## Installation ⭐

```bash
npm install as-fetch
```

## Optional Dependencies 🔥

[Undici-Fetch](https://npmjs.com/package/undici-fetch)
Provides much faster http requests with Undici.
```bash
npm install undici-fetch
```

## Requirements 🚀

Add the `--exportRuntime` and `--exportTable` flags

```js
+ const FetchImports = require("as-fetch")
+ const Fetch = new FetchImports()
const imports = {
+  ...Fetch.wasmImports,
}
const wasmModule = loader.instantiateSync(...)
+ Fetch.wasmExports = wasmModule.exports
```

## Usage

**GET Request**

```js
import { fetch } from "as-fetch";

fetch("https://example.com/get", {
  method: "GET",
  mode: "no-cors",
  headers: [],
}).then((response) => {
  const text = response.text();
  console.log("Response: " + text);
});
```

**POST Request**

```js
import { fetch } from "as-fetch";

fetch("https://example.com/post", {
  method: "POST",
  mode: "no-cors",
  headers: [["content-type", "text/plain"]],
  body: String.UTF8.encode("Hello World"),
}).then((response) => {
  const text = response.text();
  console.log("Response: " + text);
});
```

## Performance ⚡
Note: Performance of as-fetch depends on the backend. 😉

100 Requests

Fetch: 847ms -- Undici-Fetch: 21ms -- Node-Fetch: 97ms

1,000 Requests

Fetch: 5,255ms -- Undici-Fetch: 186ms -- Node-Fetch: 657ms

10,000 Requests

Fetch: 46,897ms -- Undici-Fetch: 904ms -- Node-Fetch: 4,795ms

## Contributors

Thank you, Aaron Turner for creating the main implementation of the API!