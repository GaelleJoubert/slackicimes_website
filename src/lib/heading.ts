export interface HighlightedParts {
  before: string;
  highlight: string;
  after: string;
}

export function splitAroundHighlight(
  text: string,
  highlight: string,
): HighlightedParts {
  const highlightStart = text.indexOf(highlight);
  const hasHighlight = highlight.length > 0 && highlightStart >= 0;
  if (!hasHighlight) {
    return { before: text, highlight: "", after: "" };
  }
  const highlightEnd = highlightStart + highlight.length;
  return {
    before: text.slice(0, highlightStart),
    highlight,
    after: text.slice(highlightEnd),
  };
}
