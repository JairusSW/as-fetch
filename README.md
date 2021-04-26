# As-Fetch
**Fetch API brought to AssemblyScript**

## Installation

```bash
~ npm install as-fetch
```

## Requirements

Add the `--exportRuntime` and `--exportTable` flags

## Usage

**GET Request**

```js
import { fetch } from 'as-fetch'

fetch('https://example.com/get', {
    method: 'GET',
    mode: 'no-cors',
    headers: []
}).then((response) => {

    const text = response.text()

    console.log('Response: ' + text)

})
```

**POST Request**

```js
import { fetch } from 'as-fetch'

fetch('https://example.com/post', {
    method: 'POST',
    mode: 'no-cors',
    headers: [
        ['content-type', 'text/plain']
    ],
    body: String.UTF8.encode('Hello World')
}).then((response) => {

    const text = response.text()

    console.log('Response: ' + text)

})
```