const FIRST_SECTION_INDEX = 0;

export function findCurrentSectionIndex(
  sectionTops: readonly number[],
  readingLine: number,
): number {
  const lastPassedIndex = sectionTops.findLastIndex(
    (sectionTop) => sectionTop <= readingLine,
  );
  return Math.max(lastPassedIndex, FIRST_SECTION_INDEX);
}
