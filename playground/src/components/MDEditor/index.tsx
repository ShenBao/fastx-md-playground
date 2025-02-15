import { useState } from "react";

import { Editor } from "@bytemd/react";

// 支持中断的插件（允许换行）
import breaks from "@bytemd/plugin-breaks";
// 解析前言并格式化插件
import frontmatter from "@bytemd/plugin-frontmatter";
// 表情插件（支持 GitHub 风格的表情符号）
import gemoji from "@bytemd/plugin-gemoji";

// GFM 插件 - 支持 GitHub 风格的 Markdown
import gfm from "@bytemd/plugin-gfm";

// 代码高亮插件
import highlight from "@bytemd/plugin-highlight";
import "highlight.js/styles/default.css"; // 引入代码高亮样式

// 数学公式插件
import math from "@bytemd/plugin-math";
import "katex/dist/katex.css"; // 引入 KaTeX 样式

// 图片插件（支持缩放）
import mediumZoom from "@bytemd/plugin-medium-zoom";

// 图表插件（Mermaid）
import mermaid from "@bytemd/plugin-mermaid";

// 对齐插件（支持文本对齐）
import align from "@fastx/bytemd-plugin-align";

// 主题插件（允许切换主题）
import markdownTheme from "@fastx/bytemd-plugin-markdown-theme";
import themes from "@fastx/bytemd-plugin-markdown-theme/dist/themes.json";

// 代码高亮插件（加强版）
import highlightTheme from "@fastx/bytemd-plugin-highlight-theme";
import highlights from "@fastx/bytemd-plugin-highlight-theme/dist/highlights.json";

// 图片缩放插件
import imageZoom from "@fastx/bytemd-plugin-image-zoom";

import zhHans from "bytemd/locales/zh_Hans.json";
import zhHansAlign from "@fastx/bytemd-plugin-align/locales/zh_Hans.json";
import zhHansMarkdownTheme from "@fastx/bytemd-plugin-markdown-theme/locales/zh_Hans.json";
import zhHansHighlightTheme from "@fastx/bytemd-plugin-highlight-theme/locales/zh_Hans.json";
import zhHansImageZoom from "@fastx/bytemd-plugin-image-zoom/locales/zh_Hans.json";

// 代码复制插件
import copyCode from "@fastx/bytemd-plugin-copy-code";
import zhHansCopyCode from "@fastx/bytemd-plugin-copy-code/locales/zh_Hans.json";
import "@fastx/bytemd-plugin-copy-code/dist/index.css";

import { stripPrefixes } from "../../utils";

import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/vs.css";
import "./index.scss";
import "bytemd/dist/index.css";

import mdText from "./md.md?raw";

// const locales = stripPrefixes(
//   import.meta.glob("/node_modules/bytemd/locales/*.json", { eager: true })
// );
const gfmLocales = stripPrefixes(
  import.meta.glob("/node_modules/@bytemd/plugin-gfm/locales/*.json", {
    eager: true,
  })
);
const mathLocales = stripPrefixes(
  import.meta.glob("/node_modules/@bytemd/plugin-math/locales/*.json", {
    eager: true,
  })
);
const mermaidLocales = stripPrefixes(
  import.meta.glob("/node_modules/@bytemd/plugin-mermaid/locales/*.json", {
    eager: true,
  })
);

const localeKey = "zh_Hans";

const plugins = [
  // 启用 GFM 插件
  gfm({
    // breaks: true, // 支持软换行
    // bulletListMarker: "-", // 无序列表标记
    // emoji: true, // 支持 emoji
    // tasklist: true, // 支持任务列表
    // strikethrough: true, // 支持删除线
    // list: true,
    locale: gfmLocales[localeKey],
  }),

  // 启用换行符插件
  breaks(),
  // 启用前言解析插件
  frontmatter(),
  // 启用表情插件
  gemoji(),

  // 启用图片缩放插件
  mediumZoom(),

  // 启用对齐插件
  align({
    locale: zhHansAlign,
  }),
  imageZoom({
    locale: zhHansImageZoom,
  }),

  // 启用数学公式插件
  math({
    locale: mathLocales[localeKey],
    katexOptions: { output: "html" }, // https://github.com/KaTeX/KaTeX/issues/2796
  }),
  // 启用 Mermaid 插件
  mermaid({
    locale: mermaidLocales[localeKey],
  }),
  // 启用代码高亮插件
  highlight({
    // theme: "github-markdown-css/github-markdown.css", // 或其他主题
  }),
  // 启用增强版代码高亮插件
  highlightTheme({
    locale: zhHansHighlightTheme,
    highlights,
    defaultHighlight: "atom-one-dark",
  }),
  // 启用 Markdown 主题插件
  markdownTheme({
    locale: zhHansMarkdownTheme,
    themes,
    defaultTheme: "juejin",
  }),

  // 启用代码复制插件
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
];

enum modeEnum {
  Split = "split",
}

// 编辑器配置
const editorConfig = {
  mode: modeEnum.Split,
  placeholder: "开始编写你的 Markdown 文档...",
  uploadImages: async (files: File[]) => {
    // 这里可以实现图片上传功能
    return files.map((file) => ({
      url: URL.createObjectURL(file),
      alt: file.name,
      title: file.name,
    }));
  },
  sanitize: function (value: any) {
    console.log(value);

    return {
      ...value,
      protocols: {
        ...value.protocols,
        src: [...(value.protocols?.src ?? []), "data"],
      },
    };
  },
};

const MDEditor = () => {
  const [value, setValue] = useState(mdText || "");

  return (
    <div className="editor-wrapper">
      <Editor
        value={value}
        plugins={plugins}
        locale={zhHans}
        onChange={(v: string) => {
          console.log("============== newValue:");
          console.log(v);
          setValue(v);
        }}
        {...editorConfig}
      />
    </div>
  );
};

export default MDEditor;
