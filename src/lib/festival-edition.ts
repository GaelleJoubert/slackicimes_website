export function editionNumberLabel(editionNumber: number): string {
  return `#${editionNumber}`;
}

export function editionPeriodLabel(
  period: string,
  editionNumber?: number,
): string {
  if (editionNumber === undefined) return period;
  return `${period} · ${editionNumberLabel(editionNumber)}`;
}
