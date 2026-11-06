import { describe, expect, it } from "vitest";
import {
  authorInitial,
  estimatedTextHeight,
  largestFittingTextSize,
  pairMatchingItems,
  testimonialParagraphs,
} from "../../src/lib/testimonial";

const LARGE = { name: "large", charactersPerLine: 10, lineHeightPx: 40 };
const SMALL = { name: "small", charactersPerLine: 20, lineHeightPx: 20 };
const BOX = { heightPx: 100, paragraphGapPx: 10 };

describe("authorInitial", () => {
  it("returns the uppercase first letter, accents included", () => {
    expect(authorInitial("élodie")).toBe("É");
  });
});

describe("testimonialParagraphs", () => {
  it("splits markdown on blank lines and drops empty paragraphs", () => {
    expect(testimonialParagraphs("Premier.\n\n  \n\nSecond.\n")).toEqual([
      "Premier.",
      "Second.",
    ]);
  });
});

describe("estimatedTextHeight", () => {
  it("counts started lines per paragraph and the gaps between paragraphs", () => {
    const paragraphs = ["a".repeat(15), "a".repeat(5)];
    expect(estimatedTextHeight(paragraphs, LARGE, BOX.paragraphGapPx)).toBe(
      130,
    );
  });
});

describe("largestFittingTextSize", () => {
  it("keeps the largest size when the text fits", () => {
    expect(largestFittingTextSize(["a".repeat(20)], [LARGE, SMALL], BOX)).toBe(
      "large",
    );
  });

  it("steps down to a smaller size when the larger one overflows", () => {
    expect(largestFittingTextSize(["a".repeat(30)], [LARGE, SMALL], BOX)).toBe(
      "small",
    );
  });

  it("falls back to the smallest size when nothing fits", () => {
    expect(largestFittingTextSize(["a".repeat(500)], [LARGE, SMALL], BOX)).toBe(
      "small",
    );
  });

  it("rejects an empty candidate list", () => {
    expect(() => largestFittingTextSize(["a"], [], BOX)).toThrow();
  });
});

describe("pairMatchingItems", () => {
  const isShort = (word: string) => word.length <= 3;

  it("pairs each matching item with the next matching one, in order", () => {
    expect(
      pairMatchingItems(["ab", "long", "cd", "ef", "longer"], isShort),
    ).toEqual([["ab", "cd"], ["long"], ["ef"], ["longer"]]);
  });

  it("leaves a matching item alone when no partner follows", () => {
    expect(pairMatchingItems(["long", "ab"], isShort)).toEqual([
      ["long"],
      ["ab"],
    ]);
  });
});
