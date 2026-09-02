import type { Metadata } from "next";
import { DividendCalculator } from "@/components/calculators/investment/dividend-calculator";

export const metadata: Metadata = {
  title: "배당금 계산기",
  description:
    "투자금과 배당수익률을 기준으로 연간·월 평균 배당금을 계산합니다.",
  openGraph: {
    title: "배당금 계산기 | FREELY",
    description:
      "투자금과 배당수익률을 기준으로 연간·월 평균 배당금을 계산합니다.",
  },
};

export default function DividendCalculatorPage() {
  return <DividendCalculator />;
}
