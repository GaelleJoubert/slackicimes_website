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
