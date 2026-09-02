import type { Metadata } from "next";
import { DepositCalculator } from "@/components/calculators/savings/deposit-calculator";

export const metadata: Metadata = {
  title: "예금 계산기",
  description:
    "예치금, 연 이자율, 기간을 기준으로 세전 이자와 만기 금액을 계산합니다.",
  openGraph: {
    title: "예금 계산기 | FREELY",
    description:
      "예치금, 연 이자율, 기간을 기준으로 세전 이자와 만기 금액을 계산합니다.",
  },
};

export default function DepositCalculatorPage() {
  return <DepositCalculator />;
}
