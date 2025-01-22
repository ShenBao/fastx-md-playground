import { useState } from "react";

import { Editor, Viewer } from "@bytemd/react";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";

import align from "@fastx/bytemd-plugin-align";
import markdownTheme from "@fastx/bytemd-plugin-markdown-theme";
import themes from "@fastx/bytemd-plugin-markdown-theme/dist/themes.json";
import highlightTheme from '@fastx/bytemd-plugin-highlight-theme'
import highlights from '@fastx/bytemd-plugin-highlight-theme/dist/highlights.json'

import zhHans from "bytemd/locales/zh_Hans.json";
import zhHansAlign from "@fastx/bytemd-plugin-align/locales/zh_Hans.json";
import zhHansMarkdownTheme from "@fastx/bytemd-plugin-markdown-theme/locales/zh_Hans.json";
import zhHansHighlightTheme from '@fastx/bytemd-plugin-highlight-theme/locales/zh_Hans.json'

import { exportMarkdown, stripPrefixes } from "../../utils";

import "github-markdown-css/github-markdown.css";
import "highlight.js/styles/vs.css";
import "./index.scss";
import "bytemd/dist/index.css";

const locales = stripPrefixes(
  import.meta.glob("/node_modules/bytemd/locales/*.json", { eager: true })
);
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
  breaks(),
  frontmatter(),
  gemoji(),
  gfm({
    // breaks: true, // 支持软换行
    // bulletListMarker: "-", // 无序列表标记
    // emoji: true, // 支持 emoji
    // tasklist: true, // 支持任务列表
    // strikethrough: true, // 支持删除线
    // list: true,
    locale: gfmLocales[localeKey],
  }),

  highlight({
    // theme: "github-markdown-css/github-markdown.css", // 或其他主题
  }),
  math({
    locale: mathLocales[localeKey],
    katexOptions: { output: "html" }, // https://github.com/KaTeX/KaTeX/issues/2796
  }),
  mediumZoom(),
  mermaid({
    locale: mermaidLocales[localeKey],
  }),
  align({
    locale: zhHansAlign,
  }),
  highlightTheme({
    locale: zhHansHighlightTheme,
    highlights,
    defaultHighlight: 'atom-one-dark'
  }),
  markdownTheme({
    locale: zhHansMarkdownTheme,
    themes,
    defaultTheme: "juejin",
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
  const [value, setValue] = useState("");

  return (
    <div className="editor-wrapper">
      <Editor
        value={value}
        plugins={plugins}
        locale={zhHans}
        onChange={(v: string) => {
          setValue(v);
        }}
        {...editorConfig}
      />
    </div>
  );
};

export default MDEditor;
