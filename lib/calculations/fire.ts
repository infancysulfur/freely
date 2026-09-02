import { assertNonNegative, assertPositive, toMonthlyRate } from "@/lib/calculations/number";

export interface FireSimulationInput {
  currentAge: number;
  currentAsset: number;
  monthlyInvestment: number;
  annualReturnRate: number;
  targetAsset: number;
  maxMonths?: number;
}

export interface FireSimulationPoint {
  month: number;
  age: number;
  asset: number;
  contribution: number;
  investmentReturn: number;
}

export interface FireSimulationResult {
  monthsToFire: number | null;
  fireAge: number | null;
  points: FireSimulationPoint[];
}

export function calculateFireTarget(monthlyExpense: number, withdrawalRate: number): number {
  assertNonNegative(monthlyExpense, "monthlyExpense");
  assertPositive(withdrawalRate, "withdrawalRate");

  // FIRE 목표자산은 연간 생활비를 목표 인출률로 나누어 계산한다.
  return (monthlyExpense * 12) / withdrawalRate;
}

export function calculateFireProgress(currentAsset: number, targetAsset: number): number {
  assertNonNegative(currentAsset, "currentAsset");
  assertPositive(targetAsset, "targetAsset");

  return Math.min((currentAsset / targetAsset) * 100, 100);
}

export function formatMonthsToYearsAndMonths(months: number | null): string {
  if (months === null || months <= 0) return "-";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths}개월`;
  if (remainingMonths === 0) return `${years}년`;

  return `${years}년 ${remainingMonths}개월`;
}

export function calculateTotalContributions(
  currentAsset: number,
  monthlyInvestment: number,
  monthsToFire: number | null,
): number {
  const months = monthsToFire ?? 12 * 100;
  return currentAsset + monthlyInvestment * months;
}

export function calculateTotalInvestmentReturn(
  currentAsset: number,
  monthlyInvestment: number,
  simulation: FireSimulationResult,
): number {
  if (simulation.points.length === 0) return 0;

  const totalContributions =
    currentAsset + monthlyInvestment * simulation.points.length;
  const finalAsset =
    simulation.points[simulation.points.length - 1]?.asset ?? 0;

  return Math.max(finalAsset - totalContributions, 0);
}

export function simulateFire(input: FireSimulationInput): FireSimulationResult {
  assertPositive(input.currentAge, "currentAge");
  assertNonNegative(input.currentAsset, "currentAsset");
  assertNonNegative(input.monthlyInvestment, "monthlyInvestment");
  assertNonNegative(input.annualReturnRate, "annualReturnRate");
  assertPositive(input.targetAsset, "targetAsset");

  const maxMonths = input.maxMonths ?? 12 * 100;
  const monthlyRate = toMonthlyRate(input.annualReturnRate);
  const points: FireSimulationPoint[] = [];
  let asset = input.currentAsset;

  if (asset >= input.targetAsset) {
    return {
      monthsToFire: 0,
      fireAge: input.currentAge,
      points,
    };
  }

  for (let month = 1; month <= maxMonths; month += 1) {
    const investmentReturn = asset * monthlyRate;
    asset = asset + investmentReturn + input.monthlyInvestment;

    points.push({
      month,
      age: input.currentAge + month / 12,
      asset,
      contribution: input.monthlyInvestment,
      investmentReturn,
    });

    if (asset >= input.targetAsset) {
      return {
        monthsToFire: month,
        fireAge: input.currentAge + month / 12,
        points,
      };
    }
  }

  return {
    monthsToFire: null,
    fireAge: null,
    points,
  };
}
