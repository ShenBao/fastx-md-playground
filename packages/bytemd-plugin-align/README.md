# @fastx/bytemd-plugin-align

[![npm](https://img.shields.io/npm/v/@fastx/bytemd-plugin-align.svg)](https://www.npmjs.com/package/@fastx/bytemd-plugin-align)

ByteMD plugin to support align type

## Usage

```js

import { Editor } from 'bytemd'
import align from '@fastx/bytemd-plugin-align'

new Editor({
  target: document.body,
  props: {
    plugins: [
      align(),
      // ... other plugins
    ],
  },
})
```

## License

MIT