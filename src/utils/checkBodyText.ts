import { remark } from "remark";

export async function checkBodyText(
  body: string,
  bannedDomains: string[]
): Promise<boolean> {
  const lexer = remark();
  let tokens = lexer.parse(body).children;

  // const res = remark().processSync(body);
  return false;
}
