import { describe, expect, it } from "vitest";
import { findCurrentSectionIndex } from "../../src/lib/scroll-spy";

const READING_LINE = 300;

describe("findCurrentSectionIndex", () => {
  it("falls back to the first section while every section is below the reading line", () => {
    expect(findCurrentSectionIndex([400, 900, 1500], READING_LINE)).toBe(0);
  });

  it("returns the last section whose top has passed the reading line", () => {
    expect(findCurrentSectionIndex([-800, 120, 900], READING_LINE)).toBe(1);
  });

  it("counts a section whose top sits exactly on the reading line", () => {
    expect(findCurrentSectionIndex([-800, READING_LINE], READING_LINE)).toBe(1);
  });

  it("returns the last section once all have scrolled past", () => {
    expect(findCurrentSectionIndex([-2000, -1200, -300], READING_LINE)).toBe(2);
  });
});
