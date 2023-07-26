# Fetch

**The `fetch()` API brought to AssemblyScript**

# Notice: as-fetch only supports one instance of fetch at the moment

## Installation

```bash
npm install JairusSW/as-fetch
```

## Setting up

Add the fetch imports to your instantiation file.

**Compiled Wasm**
```js
+ import { FetchImport } from "as-fetch/imports";
+ const Fetch = new FetchImport();
const compiled = new WebAssembly.Module(wasm);
const imports = {
+  ...Fetch.wasmImports
}
const wasmModule = new WebAssembly.Instance(compiled, imports);
+ Fetch.wasmExports = wasmModule.exports;
```

**Instantiated Wasm**
```js
+ import { FetchImport } from "as-fetch/imports";
+ const Fetch = new FetchImport();
const imports = {
+  ...Fetch.wasmImports
}
WebAssembly.instantiate(compiled, imports).then(wasmModule => {
    + Fetch.wasmExports = wasmModule.exports;
});
```

## Usage

Only supports get and no options like method, main, body, headers yet!
Will come soon though.

```js
import { fetch } from "as-fetch/assembly";

// Make sure to add this line!
export { responseHandler } from "as-fetch/assembly";

fetch("http://api.quotable.io/random", {
  method: "GET",
  mode: "no-cors",
  headers: [],
  body: null
}).then((response) => {
  const text = response.text();
  // response.text16() is faster :D
  console.log("Response: " + text);
});
```