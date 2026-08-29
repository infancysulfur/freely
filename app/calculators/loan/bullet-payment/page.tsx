import type { Metadata } from "next";
import { BulletPaymentCalculator } from "@/components/calculators/loan/bullet-payment-calculator";

export const metadata: Metadata = {
  title: "만기일시상환 계산기 | FREELY",
  description: "만기일시상환 방식의 월 이자와 총 상환금을 계산합니다.",
};

export default function BulletPaymentPage() {
  return <BulletPaymentCalculator />;
}
