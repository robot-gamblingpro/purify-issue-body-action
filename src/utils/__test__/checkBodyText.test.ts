import { checkBodyText } from "../checkBodyText";

describe("checkBodyText", () => {
  test("should detect inline url", () => {
    const res = checkBodyText("look at this: http://example.com/image123", [
      "example.com",
    ]);

    expect(res).toBe(true);
  });

  test("should detect inline url in **", () => {
    const res = checkBodyText("look at this: **http://example.com/image123**", [
      "example.com",
    ]);

    expect(res).toBe(true);
  });

  test("should not detect inline url not from blacklisted domains", () => {
    const res = checkBodyText("look at this: http://example.com/image123", [
      "baddomain.com",
    ]);

    expect(res).toBe(false);
  });

  test("should not detect well formed urls", () => {
    const res = checkBodyText("look at [this](http://example.com/image123)", [
      "example.com",
    ]);

    expect(res).toBe(false);
  });

  test("should not detect images", () => {
    const res = checkBodyText(
      "look at this image ![](http://example.com/image123.jpg)",
      ["example.com"]
    );

    expect(res).toBe(false);
  });

  test("should not detect code blocks", () => {
    const res = checkBodyText(
      `
\`\`\`
http://example.com/image123.jpg
\`\`\`
`,
      ["example.com"]
    );

    expect(res).toBe(false);
  });

  test("should not detect html code blocks", () => {
    const res = checkBodyText(
      `
<code>
http://example.com/image123.jpg
</code>
`,
      ["example.com"]
    );

    expect(res).toBe(false);
  });
});
