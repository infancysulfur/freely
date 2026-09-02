import type { Metadata } from "next";
import { FireCalculator } from "@/components/calculators/fire/fire-calculator";

export const metadata: Metadata = {
  title: "FIRE 계산기",
  description:
    "경제적 자유(FIRE)에 필요한 목표자산, 달성률, 예상 달성 시점을 월 단위로 시뮬레이션하는 무료 계산기입니다.",
  openGraph: {
    title: "FIRE 계산기 | FREELY",
    description:
      "경제적 자유(FIRE)에 필요한 목표자산, 달성률, 예상 달성 시점을 월 단위로 시뮬레이션하는 무료 계산기입니다.",
  },
};

export default function FireCalculatorPage() {
  return <FireCalculator />;
}
