import { describe, expect, it } from "vitest";
import {
  formatPriceInEuros,
  formatStepNumber,
  lowercaseFirstLetter,
  splitAfterSemicolons,
} from "../../src/lib/format";

const NARROW_NO_BREAK_SPACE = " ";
const NO_BREAK_SPACE = " ";

describe("formatStepNumber", () => {
  it("numbers the first step 01", () => {
    expect(formatStepNumber(0)).toBe("01");
  });

  it("keeps two digit numbers as they are", () => {
    expect(formatStepNumber(11)).toBe("12");
  });
});

describe("formatPriceInEuros", () => {
  it("puts the euro sign after the amount in French", () => {
    const formattedPrice = formatPriceInEuros(160, "fr");
    expect(formattedPrice.replace(NARROW_NO_BREAK_SPACE, NO_BREAK_SPACE)).toBe(
      `160${NO_BREAK_SPACE}€`,
    );
  });

  it("puts the euro sign before the amount in English", () => {
    expect(formatPriceInEuros(250, "en")).toBe("€250");
  });
});

describe("lowercaseFirstLetter", () => {
  it("lowercases only the first letter, accents included", () => {
    expect(lowercaseFirstLetter("Au plan d'eau", "fr")).toBe("au plan d'eau");
    expect(lowercaseFirstLetter("Étape Une", "fr")).toBe("étape Une");
  });
});

describe("splitAfterSemicolons", () => {
  it("keeps each semicolon with the group before it, in French spacing", () => {
    expect(
      splitAfterSemicolons("26-27 juin ; 3-4 juillet ; 14-15 août"),
    ).toEqual(["26-27 juin ;", "3-4 juillet ;", "14-15 août"]);
  });

  it("splits English spacing the same way", () => {
    expect(splitAfterSemicolons("June 26-27; July 3-4")).toEqual([
      "June 26-27;",
      "July 3-4",
    ]);
  });

  it("returns a text without semicolons as a single group", () => {
    expect(splitAfterSemicolons("Du 12 au 16 juillet 2027")).toEqual([
      "Du 12 au 16 juillet 2027",
    ]);
  });
});
