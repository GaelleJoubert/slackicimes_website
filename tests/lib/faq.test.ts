import { describe, expect, it } from "vitest";
import { groupByFaqTheme, type FaqTheme } from "../../src/lib/faq";

describe("groupByFaqTheme", () => {
  it("follows the theme order and keeps the question order inside a theme", () => {
    const groups = groupByFaqTheme([
      { theme: "access", question: "first access" },
      { theme: "choosing", question: "choosing" },
      { theme: "access", question: "second access" },
    ]);

    expect(groups.map((group) => group.theme)).toEqual(["choosing", "access"]);
    expect(groups[1]?.questions.map((entry) => entry.question)).toEqual([
      "first access",
      "second access",
    ]);
  });

  it("refuses a question without a known theme instead of hiding it", () => {
    const staleQuestion = { theme: undefined } as unknown as {
      theme: FaqTheme;
    };

    expect(() => groupByFaqTheme([staleQuestion])).toThrow(/known theme/);
  });

  it("leaves out the themes without a question", () => {
    expect(groupByFaqTheme([])).toEqual([]);
  });
});
