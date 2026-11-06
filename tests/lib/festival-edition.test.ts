import { describe, expect, it } from "vitest";
import {
  editionNumberLabel,
  editionPeriodLabel,
} from "../../src/lib/festival-edition";

describe("editionNumberLabel", () => {
  it("prefixes the edition number with a hash", () => {
    expect(editionNumberLabel(6)).toBe("#6");
  });
});

describe("editionPeriodLabel", () => {
  it("appends the edition number to the period", () => {
    expect(editionPeriodLabel("2022", 7)).toBe("2022 · #7");
  });

  it("keeps the period alone for a period without edition number", () => {
    expect(editionPeriodLabel("2019 – 2021")).toBe("2019 – 2021");
  });
});
