import { assertNonNegative, assertPositive } from "@/lib/calculations/number";

export function calculateDeposit(principal: number, annualRate: number, years: number) {
  assertNonNegative(principal, "principal");
  assertNonNegative(annualRate, "annualRate");
  assertPositive(years, "years");

  const beforeTaxInterest = principal * annualRate * years;

  return {
    beforeTaxInterest,
    maturityAmount: principal + beforeTaxInterest,
  };
}

export function calculateInstallmentSavings(monthlyPayment: number, annualRate: number, months: number) {
  assertNonNegative(monthlyPayment, "monthlyPayment");
  assertNonNegative(annualRate, "annualRate");
  assertPositive(months, "months");

  const monthlyRate = annualRate / 12;
  const totalContribution = monthlyPayment * months;
  let beforeTaxInterest = 0;

  // 월말 납입을 기준으로 각 납입금이 남은 개월 수만큼 이자를 얻는 단순 적금 모델이다.
  for (let month = 1; month <= months; month += 1) {
    beforeTaxInterest += monthlyPayment * monthlyRate * (months - month);
  }

  return {
    totalContribution,
    beforeTaxInterest,
    maturityAmount: totalContribution + beforeTaxInterest,
  };
}
