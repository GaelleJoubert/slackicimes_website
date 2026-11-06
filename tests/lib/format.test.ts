import { describe, expect, it } from "vitest";
import {
  formatPriceInEuros,
  formatStepNumber,
  lowercaseFirstLetter,
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
