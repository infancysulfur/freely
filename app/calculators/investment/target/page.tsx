import type { Metadata } from "next";
import { TargetCalculator } from "@/components/calculators/investment/target-calculator";

export const metadata: Metadata = {
  title: "목표금액 계산기 | FREELY",
  description: "목표 자산을 만들기 위해 필요한 월 투자금을 계산합니다.",
};

export default function TargetCalculatorPage() {
  return <TargetCalculator />;
}
