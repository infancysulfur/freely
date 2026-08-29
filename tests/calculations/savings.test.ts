import { calculateDeposit, calculateInstallmentSavings } from "@/lib/calculations/savings";

describe("savings calculations", () => {
  it("calculates deposit interest before tax", () => {
    expect(calculateDeposit(10_000_000, 0.03, 1)).toEqual({
      beforeTaxInterest: 300_000,
      maturityAmount: 10_300_000,
    });
  });

  it("calculates installment savings with month-end payments", () => {
    const result = calculateInstallmentSavings(1_000_000, 0.12, 12);

    expect(result.totalContribution).toBe(12_000_000);
    expect(result.beforeTaxInterest).toBe(660_000);
    expect(result.maturityAmount).toBe(12_660_000);
  });
});
