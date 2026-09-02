import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "금융 계산기 목록",
  description:
    "복리 계산, 대출 상환, 예금/적금, FIRE 계산까지. 필요한 금융 계산기를 찾아보세요.",
  openGraph: {
    title: "금융 계산기 | FREELY",
    description:
      "복리 계산, 대출 상환, 예금/적금, FIRE 계산까지. 필요한 금융 계산기를 찾아보세요.",
  },
};

const calculatorSections = [
  {
    title: "투자",
    calculators: [
      {
        title: "복리 계산기",
        description: "투자 후 자산을 계산합니다.",
        href: "/calculators/investment/compound",
      },
      {
        title: "목표금액 계산기",
        description: "목표 자산을 만들기 위한 월 투자금을 계산합니다.",
        href: "/calculators/investment/target",
      },
      {
        title: "배당금 계산기",
        description: "투자금으로 받을 배당금을 계산합니다.",
        href: "/calculators/investment/dividend",
      },
    ],
  },
  {
    title: "대출",
    calculators: [
      {
        title: "원리금균등상환",
        description: "매월 같은 금액을 상환하는 방식을 계산합니다.",
        href: "/calculators/loan/equal-payment",
      },
      {
        title: "원금균등상환",
        description: "매월 같은 원금을 상환하는 방식을 계산합니다.",
        href: "/calculators/loan/equal-principal",
      },
      {
        title: "만기일시상환",
        description: "기간 중 이자만 납부하고 만기에 원금을 상환하는 방식을 계산합니다.",
        href: "/calculators/loan/bullet-payment",
      },
    ],
  },
  {
    title: "저축",
    calculators: [
      {
        title: "예금 계산기",
        description: "예치금의 만기 금액을 계산합니다.",
        href: "/calculators/savings/deposit",
      },
      {
        title: "적금 계산기",
        description: "월 납입금 기준 만기 금액을 계산합니다.",
        href: "/calculators/savings/installment",
      },
    ],
  },
  {
    title: "FIRE",
    calculators: [
      {
        title: "FIRE 계산기",
        description: "경제적 자유에 필요한 자산을 계산합니다.",
        href: "/calculators/fire",
      },
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 sm:py-16">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">금융 계산기</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          돈과 관련된 다양한 계산을 쉽게 해보세요. 현재 화면은 MVP 계산기 목록이며,
          실제 계산 기능은 단계별로 추가됩니다.
        </p>
      </div>

      <div className="space-y-10">
        {calculatorSections.map((section) => (
          <section key={section.title} className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <Separator className="flex-1" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.calculators.map((calculator) => (
                <Link key={calculator.href} href={calculator.href}>
                  <Card className="h-full transition-colors hover:bg-secondary">
                    <CardHeader>
                      <CardTitle>{calculator.title}</CardTitle>
                      <CardDescription>{calculator.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
