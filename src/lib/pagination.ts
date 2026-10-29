const PAGE_NUMBER_DIGITS = 2;

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

function paddedPageNumber(pageNumber: number): string {
  return String(pageNumber).padStart(PAGE_NUMBER_DIGITS, "0");
}

export function pageLabel(pageIndex: number, totalPages: number): string {
  return `${paddedPageNumber(pageIndex + 1)} / ${paddedPageNumber(totalPages)}`;
}
