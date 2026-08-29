import {
  calculateBulletPaymentLoan,
  calculateEqualPaymentLoan,
  simulateEqualPrincipalLoan,
} from "@/lib/calculations/loan";

describe("loan calculations", () => {
  it("calculates equal payment loan values", () => {
    const result = calculateEqualPaymentLoan(100_000_000, 0.06, 12);

    expect(result.monthlyPayment).toBeCloseTo(8_606_642.97, 1);
    expect(result.totalPayment).toBeCloseTo(103_279_715.65, 1);
    expect(result.totalInterest).toBeCloseTo(3_279_715.65, 1);
  });

  it("simulates equal principal loan schedule", () => {
    const schedule = simulateEqualPrincipalLoan(12_000_000, 0.12, 12);

    expect(schedule).toHaveLength(12);
    expect(schedule[0]).toMatchObject({
      month: 1,
      principal: 1_000_000,
      interest: 120_000,
      payment: 1_120_000,
      remainingPrincipal: 11_000_000,
    });
  });

  it("calculates bullet payment loan values", () => {
    expect(calculateBulletPaymentLoan(10_000_000, 0.12, 12)).toEqual({
      monthlyInterest: 100_000,
      totalInterest: 1_200_000,
      totalPayment: 11_200_000,
    });
  });
});
