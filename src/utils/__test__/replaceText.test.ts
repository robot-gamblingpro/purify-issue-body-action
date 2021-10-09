import { replaceText } from "../replaceText";

describe("replaceText", () => {
  test("should replace inline url", () => {
    const res = replaceText(
      "look at this http://example.com/image123 link",
      ["example.com"],
      "-truncated-"
    );

    expect(res).toBe("look at this -truncated- link\n");
  });

  test("should work with md templates", () => {
    const res = replaceText(
      "look at this http://example.com/image123 link",
      ["example.com"],
      `|here's sample kitten photo: ![](http://placekitten.com/200/300)|`
    );

    expect(res).toBe(
      "look at this |here's sample kitten photo: !\\[]\\(http://placekitten.com/200/300)| link\n"
    );
  });

  test("should work with html templates", () => {
    const res = replaceText(
      "look at this http://example.com/image123 link",
      ["example.com"],
      `|here's sample kitten photo: <img src=\"http://placekitten.com/200/300\" />|`
    );

    expect(res).toBe(
      'look at this |here\'s sample kitten photo: \\<img src="http://placekitten.com/200/300" />| link\n'
    );
  });
});
