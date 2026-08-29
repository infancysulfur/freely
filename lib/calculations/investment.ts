import { assertNonNegative, assertPositive, toMonthlyRate } from "@/lib/calculations/number";

export interface CompoundInvestmentInput {
  initialAmount: number;
  monthlyContribution: number;
  months: number;
  annualReturnRate: number;
}

export interface CompoundInvestmentResult {
  totalPrincipal: number;
  investmentReturn: number;
  finalAsset: number;
}

export function calculateCompoundInvestment(input: CompoundInvestmentInput): CompoundInvestmentResult {
  assertNonNegative(input.initialAmount, "initialAmount");
  assertNonNegative(input.monthlyContribution, "monthlyContribution");
  assertNonNegative(input.annualReturnRate, "annualReturnRate");
  assertPositive(input.months, "months");

  const monthlyRate = toMonthlyRate(input.annualReturnRate);
  const totalPrincipal = input.initialAmount + input.monthlyContribution * input.months;

  if (monthlyRate === 0) {
    return {
      totalPrincipal,
      investmentReturn: 0,
      finalAsset: totalPrincipal,
    };
  }

  // 월말 납입 기준: 기존 자산은 한 달 수익률을 먼저 적용받고, 월 투자금은 월말에 더한다.
  const finalAsset =
    input.initialAmount * (1 + monthlyRate) ** input.months +
    input.monthlyContribution * (((1 + monthlyRate) ** input.months - 1) / monthlyRate);

  return {
    totalPrincipal,
    investmentReturn: finalAsset - totalPrincipal,
    finalAsset,
  };
}

export function calculateRequiredMonthlyContribution(
  targetFutureValue: number,
  currentAsset: number,
  months: number,
  annualReturnRate: number,
): number {
  assertPositive(targetFutureValue, "targetFutureValue");
  assertNonNegative(currentAsset, "currentAsset");
  assertPositive(months, "months");
  assertNonNegative(annualReturnRate, "annualReturnRate");

  if (currentAsset >= targetFutureValue) {
    return 0;
  }

  const monthlyRate = toMonthlyRate(annualReturnRate);

  if (monthlyRate === 0) {
    return (targetFutureValue - currentAsset) / months;
  }

  return (
    ((targetFutureValue - currentAsset * (1 + monthlyRate) ** months) * monthlyRate) /
    ((1 + monthlyRate) ** months - 1)
  );
}

export function calculateDividend(investmentAmount: number, dividendYield: number) {
  assertNonNegative(investmentAmount, "investmentAmount");
  assertNonNegative(dividendYield, "dividendYield");

  const annualDividend = investmentAmount * dividendYield;

  return {
    annualDividend,
    monthlyAverageDividend: annualDividend / 12,
  };
}
