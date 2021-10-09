import { unified, Plugin } from "unified";
import { visit } from "unist-util-visit";
import ejs from "ejs";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import retextParse from "retext-english";
import retextStringify from "retext-stringify";
import retextSyntaxUrls from "retext-syntax-urls";

const plugin: Plugin = function (options = {}) {
  const replaceMap: Map<string, string> = options.replaceMap || new Map();
  const bannedDomains: string[] = options.bannedDomains || [];
  const replaceTemplate: string = options.replaceTemplate || "";

  return (markdownAST) => {
    visit(markdownAST, "text", (node: any) => {
      const res = unified()
        .use(retextParse)
        .use(retextSyntaxUrls)
        .use(function () {
          return (textAST) => {
            visit(textAST, "SourceNode", (node) => {
              const link = node.value;
              const url = new URL(link);
              const bannedDomain = bannedDomains.find(
                (d) => d === url.hostname
              );

              if (bannedDomain) {
                node.value = ejs.render(replaceTemplate, {
                  original: node.value,
                });
              }
            });
          };
        })
        .use(retextStringify)
        .processSync(node.value);

      const token = generateRandomToken();
      replaceMap.set(token, String(res));

      node.value = token;
    });
  };
};

export const DEFAULT_REPLACE = "/* cut by terminator */";

export function replaceText(
  body: string,
  bannedDomains: string[] = [],
  replaceTemplate = DEFAULT_REPLACE
): string {
  const replaceMap = new Map<string, string>();

  const processor = unified()
    .use(remarkParse)
    .use(plugin, { bannedDomains, replaceTemplate, replaceMap })
    .use(remarkStringify);

  const res = processor.processSync(body);
  const strRes = String(res);
  let replacedStr = strRes;
  replaceMap.forEach((val, key) => {
    replacedStr = replacedStr.replace(key, val);
  });

  return replacedStr;
}

function generateRandomToken() {
  return "$" + Math.random() + "$";
}
