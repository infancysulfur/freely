export function formatCurrency(value: number): string {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

export function formatNumber(value: number, fractionDigits = 1): string {
  return value.toLocaleString("ko-KR", {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  });
}

export function parseNumberInput(value: string): number {
  const parsedValue = Number(value.replaceAll(",", ""));

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}
