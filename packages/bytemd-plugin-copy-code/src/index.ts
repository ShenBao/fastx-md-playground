import { BytemdPlugin, BytemdViewerContext } from "bytemd";
import ClipBoard from "clipboard";
import { visit } from "unist-util-visit";
import { addClass, hasClass, removeClass } from "./utils";
import defaultLocale from "../locales/en.json";
import "./index.css";

declare interface ByteMDPluginCopyCodeOptions {
  locale?: {
    [key: string]: string;
  };
  copyText?: string;
  copySuccess?: (text: string) => void;
  copyError?: (err: Error) => void;
  copyRight?: string;
}

//fold class
const HEADER_CLASS = "code-block-extension-header";
const FOLD_CLASS = "code-block-extension-fold";
const FOLD_BTN_CLASS = "code-block-extension-foldBtn";
const COPY_CLASS = "code-block-extension-copyBtn";
const LANG_CLASS = "code-block-extension-lang";
const META_CLASS = "code-block-extension-meta";

export default function copyCode(
  options: ByteMDPluginCopyCodeOptions = {}
): BytemdPlugin {
  const COPY_TEXT =
    options?.copyText ||
    options?.locale?.copyText ||
    defaultLocale?.copyText ||
    "复制代码";

  //click fold button callback
  function clickFoldBtn(e: Event) {
    let $el = e.target as HTMLElement;
    while (!hasClass($el, FOLD_BTN_CLASS)) {
      $el = $el.parentElement as HTMLElement;
    }
    const $codeEl =
      $el.parentElement?.parentElement?.parentElement?.lastElementChild;
    if (hasClass($el, FOLD_CLASS)) {
      removeClass($el, FOLD_CLASS);
      if ($codeEl) {
        removeClass($codeEl, FOLD_CLASS);
      }
    } else {
      addClass($el, FOLD_CLASS);
      if ($codeEl) {
        addClass($codeEl, FOLD_CLASS);
      }
    }
  }

  //click copy button callback
  function clickCopyBtn(e: Event) {
    let $el = e.target as HTMLElement;
    while (!hasClass($el, COPY_CLASS)) {
      $el = $el.parentElement as HTMLElement;
    }
    try {
      const $codeEl = $el?.parentElement?.parentElement?.parentElement
        ?.lastElementChild as HTMLElement;
      let codeText = "";
      $codeEl.childNodes.forEach((node) => {
        codeText += node.textContent;
      });
      if (options?.copyRight) {
        codeText += options.copyRight;
      }
      const cboard = new ClipBoard($el, {
        text() {
          return codeText;
        },
      });
      cboard
        .on("success", (e) => {
          options?.copySuccess?.call(null, e.text);
        })
        .on("error", (e) => {
          //
          options?.copyError?.call(null, new Error("copy failed"));
        });
      $el.click();
      cboard.destroy();
    } catch (err) {
      options?.copyError?.call(null, err as Error);
    }
  }
  return {
    remark: (p) => {
      p.use(() => (tree, vFile) => {
        let transformations: any[] = [];
        visit<import("unist").Node, "code">(
          tree,
          "code",
          (node: Record<string, any>) => {
            // get code child html
            const codeChildren: (Element | Text)[] = (node.data &&
              (node.data.hChildren as (Element | Text)[])) || [
              {
                type: "text",
                value: node.value,
              },
            ];
            const codeProperties: any =
              (node.data && node.data.hProperties) ||
              (node.lang
                ? {
                    className: ["language-" + node.lang],
                  }
                : {});
            // apply transformation
            const n = node;
            n.type = "code-extra";
            if (!n.data) n.data = {};
            // @ts-ignore
            const children: Record<string, any>[] = [
              {
                type: "element",
                tagName: "pre",
                children: [
                  {
                    type: "element",
                    tagName: "div",
                    properties: {
                      className: HEADER_CLASS,
                    },
                    children: [
                      //left
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: "code-block-extension-headerLeft",
                        },
                        children: [
                          {
                            type: "element",
                            tagName: "div",
                            properties: {
                              className: FOLD_BTN_CLASS,
                            },
                          },
                          {
                            type: "element",
                            tagName: "span",
                            properties: {
                              className: META_CLASS,
                            },
                            children: [
                              { type: "text", value: node?.meta ?? "" },
                            ],
                          },
                        ],
                      },
                      //right
                      {
                        type: "element",
                        tagName: "div",
                        properties: {
                          className: "code-block-extension-headerRight",
                        },
                        children: [
                          {
                            type: "element",
                            tagName: "span",
                            properties: {
                              className: LANG_CLASS,
                            },
                            children: [
                              {
                                type: "text",
                                value: node?.lang ?? "",
                              },
                            ],
                          },
                          {
                            type: "element",
                            tagName: "span",
                            properties: {
                              className: COPY_CLASS,
                              ["data-clipboard-text"]: node.value,
                            },
                            value: node.value,
                            children: [{ type: "text", value: COPY_TEXT }],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "code",
                    properties: codeProperties,
                    children: codeChildren,
                  },
                ],
              },
            ];
            n.data.hName = "div";
            n.data.hProperties = {
              className: ["bytemd-code-block"],
            };
            n.data.hChildren = children;
          }
        );
        return tree;
      });
      return p;
    },
    viewerEffect({ markdownBody }): void | (() => void) {
      const eles = markdownBody.getElementsByClassName(FOLD_BTN_CLASS);
      Array.from(eles).forEach((ele) => {
        ele.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z" data-name="Down"></path></svg>`;
        ele.removeEventListener("click", clickFoldBtn);
        ele.addEventListener("click", clickFoldBtn);
      });
      const copyEles = markdownBody.getElementsByClassName(COPY_CLASS);
      Array.from(copyEles).forEach((ele) => {
        ele.removeEventListener("click", clickCopyBtn);
        ele.addEventListener("click", clickCopyBtn);
      });
    },
  };
}
