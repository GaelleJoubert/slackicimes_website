import { describe, expect, it } from "vitest";
import {
  isOnPage,
  MAX_PAGE_DOTS,
  pageCount,
  pageDots,
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

describe("pageDots", () => {
  const activePageOf = (dots: ReturnType<typeof pageDots>) =>
    dots.find((dot) => dot.isActive)?.pageIndex;

  it("shows one dot per page when there are few pages", () => {
    const dots = pageDots(1, 3);
    expect(dots.map((dot) => dot.pageIndex)).toEqual([0, 1, 2]);
    expect(dots.some((dot) => dot.hintsMorePages)).toBe(false);
  });

  it("never shows more than the maximum number of dots", () => {
    expect(pageDots(10, 25)).toHaveLength(MAX_PAGE_DOTS);
  });

  it("keeps the active page in the middle of a long list", () => {
    const dots = pageDots(10, 25);
    expect(dots.map((dot) => dot.pageIndex)).toEqual([8, 9, 10, 11, 12]);
    expect(activePageOf(dots)).toBe(10);
  });

  it("hints at hidden pages with the edge dots", () => {
    const hints = pageDots(10, 25).map((dot) => dot.hintsMorePages);
    expect(hints).toEqual([true, false, false, false, true]);
  });

  it("stops at the first and last pages", () => {
    expect(pageDots(0, 25).map((dot) => dot.pageIndex)).toEqual([
      0, 1, 2, 3, 4,
    ]);
    expect(pageDots(24, 25).map((dot) => dot.pageIndex)).toEqual([
      20, 21, 22, 23, 24,
    ]);
    expect(pageDots(0, 25)[0].hintsMorePages).toBe(false);
    expect(pageDots(24, 25)[4].hintsMorePages).toBe(false);
  });
});
