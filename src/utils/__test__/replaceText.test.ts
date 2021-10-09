import { replaceText } from "../replaceText";

describe("replaceText", () => {
  test("should detect inline url", () => {
    const res = replaceText(
      "look at this http://example.com/image123 link",
      ["example.com"],
      "---"
    );

    expect(res).toBe("look at this --- link\n");
  });
});
