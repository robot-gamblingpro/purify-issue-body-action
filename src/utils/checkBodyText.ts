import remarkParse from "remark-parse";
import { unified, Plugin } from "unified";
import { visit } from "unist-util-visit";

const plugin: Plugin = function (options = {}) {
  const bannedDomains: string[] = options.bannedDomains || [];

  this.Compiler = (markdownAST, file) => {
    let found = false;
    visit(markdownAST, "text", (node: any) => {
      bannedDomains.forEach((bd) => {
        if ((node.value as string).indexOf(bd) > -1) {
          found = true;
        }
      });
    });

    return found ? "true" : "false";
  };
};

export function checkBodyText(body: string, bannedDomains: string[]): boolean {
  const processor = unified()
    //
    .use(remarkParse)
    .use(plugin, { bannedDomains });

  const res = processor.processSync(body);

  return String(res) === "true";
}
