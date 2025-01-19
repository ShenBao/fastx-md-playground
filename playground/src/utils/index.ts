import { saveAs } from "file-saver";

export const stripPrefixes = (obj: Record<string, object>) => {
  return Object.entries(obj).reduce((p, [key, value]) => {
    p[key.split("/").slice(-1)[0].replace(".json", "")] = value;
    return p;
  }, {} as Record<string, object>);
};

export const exportMarkdown = (
  content: string,
  filename: string = "document"
) => {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  saveAs(blob, `${filename}.md`);
};
