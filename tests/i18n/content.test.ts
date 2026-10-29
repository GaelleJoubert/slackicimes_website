import { describe, expect, it } from "vitest";
import {
  assertTranslationsComplete,
  entriesForLocale,
} from "../../src/i18n/content";

function entry(id: string, order: number) {
  return { id, data: { order } };
}

describe("assertTranslationsComplete", () => {
  it("accepts entries present in every locale", () => {
    expect(() =>
      assertTranslationsComplete("stages", ["fr/weekend", "en/weekend"]),
    ).not.toThrow();
  });

  it("accepts single entries identified by their locale", () => {
    expect(() =>
      assertTranslationsComplete("home", ["fr", "en"]),
    ).not.toThrow();
  });

  it("names every missing translation", () => {
    expect(() =>
      assertTranslationsComplete("stages", ["fr/weekend", "en/autonomie"]),
    ).toThrow(/"stages" is missing translations: en\/weekend, fr\/autonomie/);
  });
});

describe("entriesForLocale", () => {
  it("keeps the locale's entries sorted by order", () => {
    const entries = [
      entry("fr/second", 2),
      entry("en/first", 1),
      entry("fr/first", 1),
    ];
    expect(entriesForLocale(entries, "fr").map(({ id }) => id)).toEqual([
      "fr/first",
      "fr/second",
    ]);
  });
});
