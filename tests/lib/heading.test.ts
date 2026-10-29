import { describe, expect, it } from "vitest";
import { splitDisplayHeading } from "../../src/lib/heading";

describe("splitDisplayHeading", () => {
  it("splits words and breaks after an apostrophe inside a word", () => {
    expect(splitDisplayHeading("Association Slack'icîmes")).toEqual([
      { text: "Association", startsNewWord: true },
      { text: "Slack'", startsNewWord: true },
      { text: "icîmes", startsNewWord: false },
    ]);
  });

  it("handles typographic apostrophes and extra spaces", () => {
    expect(splitDisplayHeading("  Slack’icîmes   association ")).toEqual([
      { text: "Slack’", startsNewWord: true },
      { text: "icîmes", startsNewWord: false },
      { text: "association", startsNewWord: true },
    ]);
  });
});
