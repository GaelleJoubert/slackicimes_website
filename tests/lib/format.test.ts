import { describe, expect, it } from "vitest";
import { formatPriceInEuros } from "../../src/lib/format";

const NARROW_NO_BREAK_SPACE = " ";
const NO_BREAK_SPACE = " ";

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
