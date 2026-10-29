export interface HeadingPart {
  text: string;
  startsNewWord: boolean;
}

const WORD_SEPARATOR = /\s+/;
const AFTER_APOSTROPHE = /(?<=['’])/;

export function splitDisplayHeading(heading: string): HeadingPart[] {
  return heading
    .trim()
    .split(WORD_SEPARATOR)
    .flatMap((word) =>
      word.split(AFTER_APOSTROPHE).map((text, partIndex) => ({
        text,
        startsNewWord: partIndex === 0,
      })),
    );
}
