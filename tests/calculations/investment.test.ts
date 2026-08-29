import {
  calculateCompoundInvestment,
  calculateDividend,
  calculateRequiredMonthlyContribution,
} from "@/lib/calculations/investment";

describe("investment calculations", () => {
  it("calculates compound investment with monthly end contributions", () => {
    const result = calculateCompoundInvestment({
      initialAmount: 1_000_000,
      monthlyContribution: 100_000,
      months: 12,
      annualReturnRate: 0.12,
    });

    expect(result.totalPrincipal).toBe(2_200_000);
    expect(result.finalAsset).toBeCloseTo(2_395_075.33, 1);
    expect(result.investmentReturn).toBeCloseTo(195_075.33, 1);
  });

  it("handles zero return without dividing by zero", () => {
    const result = calculateCompoundInvestment({
      initialAmount: 1_000_000,
      monthlyContribution: 100_000,
      months: 12,
      annualReturnRate: 0,
    });

    expect(result.finalAsset).toBe(2_200_000);
    expect(result.investmentReturn).toBe(0);
  });

  it("rejects negative investment values", () => {
    expect(() =>
      calculateCompoundInvestment({
        initialAmount: -1,
        monthlyContribution: 100_000,
        months: 12,
        annualReturnRate: 0.07,
      }),
    ).toThrow(RangeError);
  });

  it("returns zero required contribution when current asset already meets target", () => {
    expect(calculateRequiredMonthlyContribution(10_000_000, 12_000_000, 12, 0.07)).toBe(0);
  });

  it("calculates annual and monthly average dividend", () => {
    expect(calculateDividend(10_000_000, 0.05)).toEqual({
      annualDividend: 500_000,
      monthlyAverageDividend: 41_666.666666666664,
    });
  });
});
