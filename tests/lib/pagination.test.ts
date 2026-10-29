import { describe, expect, it } from "vitest";
import {
  isOnPage,
  pageCount,
  pageLabel,
  wrapPageIndex,
} from "../../src/lib/pagination";

describe("pageCount", () => {
  it("rounds a partial last page up", () => {
    expect(pageCount(35, 2)).toBe(18);
  });

  it("keeps one page when there is no item", () => {
    expect(pageCount(0, 2)).toBe(1);
  });
});

describe("wrapPageIndex", () => {
  it("wraps past the last page back to the first", () => {
    expect(wrapPageIndex(18, 18)).toBe(0);
  });

  it("wraps before the first page to the last", () => {
    expect(wrapPageIndex(-1, 18)).toBe(17);
  });
});

describe("isOnPage", () => {
  it("places items on the page matching their index", () => {
    expect(isOnPage(2, 1, 2)).toBe(true);
    expect(isOnPage(1, 1, 2)).toBe(false);
  });
});

describe("pageLabel", () => {
  it("pads page numbers to two digits", () => {
    expect(pageLabel(0, 18)).toBe("01 / 18");
  });
});
