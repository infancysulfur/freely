export function toMonthlyRate(annualRate: number): number {
  return annualRate / 12;
}

export function assertNonNegative(value: number, fieldName: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${fieldName} must be a finite number.`);
  }

  if (value < 0) {
    throw new RangeError(`${fieldName} must be greater than or equal to 0.`);
  }
}

export function assertPositive(value: number, fieldName: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${fieldName} must be a finite number.`);
  }

  if (value <= 0) {
    throw new RangeError(`${fieldName} must be greater than 0.`);
  }
}
