import type { Metadata } from "next";
import { CompoundCalculator } from "@/components/calculators/investment/compound-calculator";

export const metadata: Metadata = {
  title: "복리 계산기",
  description:
    "초기 투자금과 월 투자금을 기준으로 복리로 자산이 불어나는 최종 금액을 계산합니다.",
  openGraph: {
    title: "복리 계산기 | FREELY",
    description:
      "초기 투자금과 월 투자금을 기준으로 복리로 자산이 불어나는 최종 금액을 계산합니다.",
  },
};

export default function CompoundCalculatorPage() {
  return <CompoundCalculator />;
}
