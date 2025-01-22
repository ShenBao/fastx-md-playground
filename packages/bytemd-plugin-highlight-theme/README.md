# @fastx/bytemd-plugin-highlight-theme

[![npm](https://img.shields.io/npm/v/@fastx/bytemd-plugin-highlight-theme.svg)](https://www.npmjs.com/package/@fastx/bytemd-plugin-highlight-theme)

ByteMD plugin to support custom code highlight theme

## Usage

```js

import { Editor } from 'bytemd'
import highlightTheme from '@fastx/bytemd-plugin-highlight-theme'
import hls from '@fastx/bytemd-plugin-highlight-theme/dist/highlights.json'

new Editor({
  target: document.body,
  props: {
    plugins: [
      highlightThemePlugin({
        highlights: hls,
      }),
      // ... other plugins
    ],
  },
})
```

## License

MIT