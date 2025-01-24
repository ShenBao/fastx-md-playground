# @fastx/bytemd-plugin-copy-code

[![npm](https://img.shields.io/npm/v/@fastx/bytemd-plugin-copy-code.svg)](https://www.npmjs.com/package/@fastx/bytemd-plugin-copy-code)

ByteMD plugin to support copy code

## Usage

```js
import { Editor } from "bytemd";
import copyCode from "@fastx/bytemd-plugin-copy-code";
import zhHansCopyCode from "@fastx/bytemd-plugin-copy-code/locales/zh_Hans.json";
import "@fastx/bytemd-plugin-copy-code/dist/index.css";

new Editor({
  target: document.body,
  props: {
    plugins: [
      copyCode({
        locale: zhHansCopyCode,
        copySuccess: (text) => {
          console.log(text);
          console.log("复制成功");
        },
        copyError: (err) => {
          console.error("复制失败", err);
        },
        copyRight: `
      
版权所有 © ${2025} ShenBao/fastx-md-playground. 保留所有权利。
    `,
      }),
    ],
  },
});
```

## License

MIT
