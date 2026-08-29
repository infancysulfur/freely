import { calculateFireProgress, calculateFireTarget, simulateFire } from "@/lib/calculations/fire";

describe("fire calculations", () => {
  it("calculates the FIRE target from monthly expense and withdrawal rate", () => {
    expect(calculateFireTarget(3_000_000, 0.04)).toBe(900_000_000);
  });

  it("caps FIRE progress at 100 percent for display use", () => {
    expect(calculateFireProgress(1_000_000_000, 900_000_000)).toBe(100);
  });

  it("rejects a zero withdrawal rate", () => {
    expect(() => calculateFireTarget(3_000_000, 0)).toThrow(RangeError);
  });

  it("returns the current age when the current asset already reaches the target", () => {
    const result = simulateFire({
      currentAge: 30,
      currentAsset: 900_000_000,
      monthlyInvestment: 2_000_000,
      annualReturnRate: 0.07,
      targetAsset: 900_000_000,
    });

    expect(result.monthsToFire).toBe(0);
    expect(result.fireAge).toBe(30);
    expect(result.points).toHaveLength(0);
  });

  it("simulates monthly return before monthly investment", () => {
    const result = simulateFire({
      currentAge: 30,
      currentAsset: 100_000_000,
      monthlyInvestment: 1_000_000,
      annualReturnRate: 0.12,
      targetAsset: 102_000_000,
      maxMonths: 1,
    });

    expect(result.points[0]).toMatchObject({
      month: 1,
      asset: 102_000_000,
      contribution: 1_000_000,
      investmentReturn: 1_000_000,
    });
    expect(result.monthsToFire).toBe(1);
  });
});
