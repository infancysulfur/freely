import type { Metadata } from "next";
import { EqualPaymentCalculator } from "@/components/calculators/loan/equal-payment-calculator";

export const metadata: Metadata = {
  title: "원리금균등상환 대출 계산기",
  description:
    "매월 같은 금액을 갚는 원리금균등상환 방식의 월 상환금, 총 이자, 총 상환금을 계산합니다.",
  openGraph: {
    title: "원리금균등상환 대출 계산기 | FREELY",
    description:
      "매월 같은 금액을 갚는 원리금균등상환 방식의 월 상환금, 총 이자, 총 상환금을 계산합니다.",
  },
};

export default function EqualPaymentPage() {
  return <EqualPaymentCalculator />;
}
