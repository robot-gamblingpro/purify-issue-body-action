import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified, Plugin } from "unified";
import { visit } from "unist-util-visit";

const plugin: Plugin = function (options = {}) {
  const bannedDomains: string[] = options.bannedDomains || [];
  const replaceTemplate: string = options.replaceTemplate || "";

  return (markdownAST, file) => {
    let found = false;

    visit(markdownAST, "text", (node: any) => {
      bannedDomains.forEach((bd) => {
        if ((node.value as string).indexOf(bd) > -1) {
          node.value = node.value.replace(bd, replaceTemplate);
        }
      });
    });
  };
};

export function replaceText(
  body: string,
  bannedDomains: string[] = [],
  replaceTemplate = "/* cut by terminator */"
): string {
  const processor = unified()
    .use(remarkParse)
    .use(plugin, { bannedDomains, replaceTemplate })
    .use(remarkStringify);

  const res = processor.processSync(body);

  return String(res);
}
