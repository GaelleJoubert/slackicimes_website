export const MAX_PAGE_DOTS = 5;

export interface PageDot {
  pageIndex: number;
  isActive: boolean;
  hintsMorePages: boolean;
}

export function pageCount(itemCount: number, itemsPerPage: number): number {
  return Math.max(1, Math.ceil(itemCount / itemsPerPage));
}

export function wrapPageIndex(pageIndex: number, totalPages: number): number {
  return ((pageIndex % totalPages) + totalPages) % totalPages;
}

export function isOnPage(
  itemIndex: number,
  pageIndex: number,
  itemsPerPage: number,
): boolean {
  return Math.floor(itemIndex / itemsPerPage) === pageIndex;
}

function firstVisibleDotPage(
  currentPageIndex: number,
  totalPages: number,
  dotCount: number,
): number {
  const centeredFirstPage = currentPageIndex - Math.floor(dotCount / 2);
  const lastPossibleFirstPage = totalPages - dotCount;
  return Math.min(Math.max(centeredFirstPage, 0), lastPossibleFirstPage);
}

export function pageDots(
  currentPageIndex: number,
  totalPages: number,
): PageDot[] {
  const dotCount = Math.min(totalPages, MAX_PAGE_DOTS);
  const firstPageIndex = firstVisibleDotPage(
    currentPageIndex,
    totalPages,
    dotCount,
  );
  const lastPageIndex = totalPages - 1;
  return Array.from({ length: dotCount }, (_, dotIndex) => {
    const pageIndex = firstPageIndex + dotIndex;
    const isFirstDot = dotIndex === 0;
    const isLastDot = dotIndex === dotCount - 1;
    const hidesEarlierPages = isFirstDot && pageIndex > 0;
    const hidesLaterPages = isLastDot && pageIndex < lastPageIndex;
    return {
      pageIndex,
      isActive: pageIndex === currentPageIndex,
      hintsMorePages: hidesEarlierPages || hidesLaterPages,
    };
  });
}
