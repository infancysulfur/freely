import { assertNonNegative, assertPositive, toMonthlyRate } from "@/lib/calculations/number";

export interface LoanPayment {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  remainingPrincipal: number;
}

export function calculateEqualPaymentLoan(principal: number, annualRate: number, months: number) {
  assertPositive(principal, "principal");
  assertNonNegative(annualRate, "annualRate");
  assertPositive(months, "months");

  const monthlyRate = toMonthlyRate(annualRate);
  const monthlyPayment =
    monthlyRate === 0
      ? principal / months
      : (principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1);

  return {
    monthlyPayment,
    totalInterest: monthlyPayment * months - principal,
    totalPayment: monthlyPayment * months,
  };
}

export function simulateEqualPrincipalLoan(
  principal: number,
  annualRate: number,
  months: number,
): LoanPayment[] {
  assertPositive(principal, "principal");
  assertNonNegative(annualRate, "annualRate");
  assertPositive(months, "months");

  const monthlyRate = toMonthlyRate(annualRate);
  const monthlyPrincipal = principal / months;
  let remainingPrincipal = principal;

  return Array.from({ length: months }, (_, index) => {
    const interest = remainingPrincipal * monthlyRate;
    const payment = monthlyPrincipal + interest;
    remainingPrincipal = Math.max(remainingPrincipal - monthlyPrincipal, 0);

    return {
      month: index + 1,
      principal: monthlyPrincipal,
      interest,
      payment,
      remainingPrincipal,
    };
  });
}

export function calculateBulletPaymentLoan(principal: number, annualRate: number, months: number) {
  assertPositive(principal, "principal");
  assertNonNegative(annualRate, "annualRate");
  assertPositive(months, "months");

  const monthlyInterest = principal * toMonthlyRate(annualRate);
  const totalInterest = monthlyInterest * months;

  return {
    monthlyInterest,
    totalInterest,
    totalPayment: principal + totalInterest,
  };
}
