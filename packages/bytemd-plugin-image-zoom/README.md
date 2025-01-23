# @fastx/bytemd-plugin-image-zoom

[![npm](https://img.shields.io/npm/v/@fastx/bytemd-plugin-image-zoom.svg)](https://www.npmjs.com/package/@fastx/bytemd-plugin-image-zoom)

ByteMD plugin to support image zoom

## Usage

```js

import { Editor } from 'bytemd'
import imageZoom from '@fastx/bytemd-plugin-image-zoom'

new Editor({
  target: document.body,
  props: {
    plugins: [
      imageZoom(),
      // ... other plugins
    ],
  },
})
```

## License

MIT