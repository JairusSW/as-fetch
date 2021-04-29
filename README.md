# Fetch

**The `fetch()` API brought to AssemblyScript**

## Installation

```bash
npm install as-fetch
```

## Requirements

Add the `--exportRuntime` and `--exportTable` flags

```js
const loader = require('@assemblyscript/loader')
const FetchImports = require('as-fetch')
const Fetch = new FetchImports()
const imports = {
    + ...Fetch.wasmImports
}
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + '/build/optimized.wasm'), imports)
Fetch.wasmExports = wasmModule.exports
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

## Contributors

Thank you, Aaron Turner and others on the Fastly team for creating the main implementation of the API! https://www.npmjs.com/package/@fastly/as-fetch
