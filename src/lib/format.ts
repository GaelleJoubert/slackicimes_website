export function formatPriceInEuros(
  amountInEuros: number,
  languageTag: string,
): string {
  return new Intl.NumberFormat(languageTag, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amountInEuros);
}

const STEP_NUMBER_DIGITS = 2;

export function formatStepNumber(stepIndex: number): string {
  return String(stepIndex + 1).padStart(STEP_NUMBER_DIGITS, "0");
}

export function lowercaseFirstLetter(
  text: string,
  languageTag: string,
): string {
  return `${text.charAt(0).toLocaleLowerCase(languageTag)}${text.slice(1)}`;
}

const BREAK_AFTER_SEMICOLON = /(?<=;)\s+/;

export function splitAfterSemicolons(text: string): string[] {
  return text.split(BREAK_AFTER_SEMICOLON);
}
