import type { Metadata } from "next";
import { FireCalculator } from "@/components/calculators/fire/fire-calculator";

export const metadata: Metadata = {
  title: "FIRE 계산기 | FREELY",
  description: "경제적 자유에 필요한 목표자산과 예상 FIRE 시점을 계산합니다.",
};

export default function FireCalculatorPage() {
  return <FireCalculator />;
}
