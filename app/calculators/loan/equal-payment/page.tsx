import type { Metadata } from "next";
import { EqualPaymentCalculator } from "@/components/calculators/loan/equal-payment-calculator";

export const metadata: Metadata = {
  title: "원리금균등상환 계산기 | FREELY",
  description: "대출 원리금균등상환 방식의 월 상환금과 총 이자를 계산합니다.",
};

export default function EqualPaymentPage() {
  return <EqualPaymentCalculator />;
}
