---
theme: channing-cyan
highlight: atom-one-dark
---

> 强大的 Markdown 编辑器

- 由 ByteMD 强力驱动，功能丰富、性能强劲
- 支持 GFM 扩展语法、脚注、Gemoji、KaTeX 数学公式、Mermaid 图表等
- 支持自定义扩展：文本对齐方式、图片缩放、自定义Markdown主题样式、自定义代码高亮样式、代码复制
- 支持实时同步预览、支持自动分析目录树

## Markdown 基础语法

I just love **bold text**. Italicized text is the _cat's meow_. At the command prompt, type `nano`.

1. First item
2. Second item
3. Third item

> Dorothy followed her through many of the beautiful rooms in her castle.

### 列表示例

1. 有序列表项 1
2. 有序列表项 2
   - 无序子列表项
   - 另一个子列表项
3. 有序列表项 3

### 代码示例

```javascript
function hello() {
  console.log('Hello, Markdown!');
}
```

```ts
const message = "Hello, FastX MD Playground!";
console.log(message);
```

### 表格示例

| 功能 | 支持情况 |
|------|----------|
| 标题 | ✅ |
| 列表 | ✅ |
| 代码块 | ✅ |
| 数学公式 | ✅ |

## GFM 扩展语法

Automatic URL Linking: https://github.com/ShenBao

~~The world is flat.~~ We now know that the world is round.

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

## 脚注

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.
[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.

## Gemoji

Thumbs up: :+1:, thumbs down: :-1:.

Families: :family_man_man_boy_boy:

Long flags: :wales:, :scotland:, :england:.

## Math Equation

Inline math equation: $a+b$

$$
\displaystyle \left( \sum_{k=1}^n a_k b_k \right)^2 \leq \left( \sum_{k=1}^n a_k^2 \right) \left( \sum_{k=1}^n b_k^2 \right)
$$

## Mermaid Diagrams

```mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

## Links

- [FastX Markdown Playground](https://github.com/ShenBao/fastx-md-playground)
- [ShenBao](https://github.com/ShenBao)
