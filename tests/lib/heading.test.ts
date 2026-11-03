import { describe, expect, it } from "vitest";
import { splitAroundHighlight } from "../../src/lib/heading";

describe("splitAroundHighlight", () => {
  it("cuts the text before and after the highlight", () => {
    expect(
      splitAroundHighlight("Association Slack'icîmes", "Slack'icîmes"),
    ).toEqual({ before: "Association ", highlight: "Slack'icîmes", after: "" });
  });

  it("keeps text on both sides of a highlight in the middle", () => {
    expect(
      splitAroundHighlight("Prendre de la hauteur, ensemble !", "ensemble"),
    ).toEqual({
      before: "Prendre de la hauteur, ",
      highlight: "ensemble",
      after: " !",
    });
  });

  it("returns the whole text untouched when the highlight is missing", () => {
    expect(splitAroundHighlight("Winter Festislack", "Summer")).toEqual({
      before: "Winter Festislack",
      highlight: "",
      after: "",
    });
  });

  it("ignores an empty highlight", () => {
    expect(splitAroundHighlight("Stages", "").before).toBe("Stages");
  });
});
