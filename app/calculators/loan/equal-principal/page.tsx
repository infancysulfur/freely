import type { Metadata } from "next";
import { EqualPrincipalCalculator } from "@/components/calculators/loan/equal-principal-calculator";

export const metadata: Metadata = {
  title: "원금균등상환 대출 계산기",
  description:
    "매월 같은 원금을 갚는 원금균등상환 방식의 월별 상환금과 상환 스케줄을 계산합니다.",
  openGraph: {
    title: "원금균등상환 대출 계산기 | FREELY",
    description:
      "매월 같은 원금을 갚는 원금균등상환 방식의 월별 상환금과 상환 스케줄을 계산합니다.",
  },
};

export default function EqualPrincipalPage() {
  return <EqualPrincipalCalculator />;
}
