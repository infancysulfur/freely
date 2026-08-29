import type { Metadata } from "next";
import { InstallmentCalculator } from "@/components/calculators/savings/installment-calculator";

export const metadata: Metadata = {
  title: "적금 계산기 | FREELY",
  description: "월 납입금과 이자율 기준으로 세전 적금 만기 금액을 계산합니다.",
};

export default function InstallmentCalculatorPage() {
  return <InstallmentCalculator />;
}
