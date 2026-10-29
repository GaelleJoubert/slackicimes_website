const PARAGRAPH_SEPARATOR = /\n\s*\n/;

export interface TextSizeCandidate<Name extends string> {
  name: Name;
  charactersPerLine: number;
  lineHeightPx: number;
}

export interface TextBox {
  heightPx: number;
  paragraphGapPx: number;
}

export function authorInitial(author: string): string {
  return author.charAt(0).toLocaleUpperCase();
}

export function testimonialParagraphs(markdown: string): string[] {
  return markdown
    .split(PARAGRAPH_SEPARATOR)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
}

export function estimatedTextHeight<Name extends string>(
  paragraphs: string[],
  candidate: TextSizeCandidate<Name>,
  paragraphGapPx: number,
): number {
  const lineCount = paragraphs.reduce(
    (total, paragraph) =>
      total + Math.ceil(paragraph.length / candidate.charactersPerLine),
    0,
  );
  const gapCount = Math.max(0, paragraphs.length - 1);
  return lineCount * candidate.lineHeightPx + gapCount * paragraphGapPx;
}

export function largestFittingTextSize<Name extends string>(
  paragraphs: string[],
  candidatesFromLargest: TextSizeCandidate<Name>[],
  box: TextBox,
): Name {
  const smallest = candidatesFromLargest.at(-1);
  if (!smallest) {
    throw new Error("largestFittingTextSize needs at least one candidate.");
  }
  const fitting = candidatesFromLargest.find(
    (candidate) =>
      estimatedTextHeight(paragraphs, candidate, box.paragraphGapPx) <=
      box.heightPx,
  );
  return (fitting ?? smallest).name;
}

export function pairMatchingItems<Item>(
  items: Item[],
  isPairable: (item: Item) => boolean,
): Item[][] {
  const groups: Item[][] = [];
  let groupAwaitingPartner: Item[] | undefined;
  for (const item of items) {
    if (!isPairable(item)) {
      groups.push([item]);
      continue;
    }
    if (groupAwaitingPartner) {
      groupAwaitingPartner.push(item);
      groupAwaitingPartner = undefined;
      continue;
    }
    groupAwaitingPartner = [item];
    groups.push(groupAwaitingPartner);
  }
  return groups;
}
