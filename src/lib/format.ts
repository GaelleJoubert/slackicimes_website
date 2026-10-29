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

export function lowercaseFirstLetter(
  text: string,
  languageTag: string,
): string {
  return `${text.charAt(0).toLocaleLowerCase(languageTag)}${text.slice(1)}`;
}
