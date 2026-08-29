import type { Metadata } from "next";
import { EqualPrincipalCalculator } from "@/components/calculators/loan/equal-principal-calculator";

export const metadata: Metadata = {
  title: "원금균등상환 계산기 | FREELY",
  description: "원금균등상환 방식의 상환금과 상환 스케줄을 계산합니다.",
};

export default function EqualPrincipalPage() {
  return <EqualPrincipalCalculator />;
}
