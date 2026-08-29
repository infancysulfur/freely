import type { Metadata } from "next";
import { DepositCalculator } from "@/components/calculators/savings/deposit-calculator";

export const metadata: Metadata = {
  title: "예금 계산기 | FREELY",
  description: "예치금, 이자율, 기간 기준으로 세전 예금 만기 금액을 계산합니다.",
};

export default function DepositCalculatorPage() {
  return <DepositCalculator />;
}
