import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "FREELY - 돈을 계산하고 미래를 설계하세요",
  description: "투자, 대출, 저축, FIRE 목표를 계산하는 개인 금융 서비스입니다.",
};

const calculatorGroups = [
  {
    name: "투자 계산기",
    description: "복리, 목표금액, 배당금 계산을 준비합니다.",
  },
  {
    name: "대출 계산기",
    description: "상환 방식별 월 상환금 계산을 준비합니다.",
  },
  {
    name: "저축 계산기",
    description: "예금과 적금 만기 금액 계산을 준비합니다.",
  },
  {
    name: "FIRE 계산기",
    description: "경제적 자유에 필요한 자산 계산을 준비합니다.",
  },
];

export default function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:py-24">
      <div className="max-w-3xl space-y-5">
        <p className="text-sm font-medium text-muted-foreground">FREELY</p>
        <h1 className="text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          돈을 계산하고 미래를 설계하세요.
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          FREELY는 투자, 대출, 저축, 경제적 자유 목표를 한곳에서 계산하기
          위한 개인 금융 서비스입니다.
        </p>
        <Button asChild>
          <Link href="/calculators">계산기 둘러보기</Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">금융 계산기</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {calculatorGroups.map((group) => (
            <Card key={group.name}>
              <CardHeader>
                <CardTitle>{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t pt-10">
        <h2 className="text-2xl font-semibold">FIRE 계산기</h2>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          경제적 자유까지 얼마나 필요한지, 현재 조건으로 언제쯤 가능한지 계산하는
          대표 기능입니다. 실제 계산 로직은 문서 기준에 맞춰 다음 단계에서
          구현합니다.
        </p>
        <Button asChild variant="outline">
          <Link href="/calculators/fire">FIRE 계산하기</Link>
        </Button>
      </div>
    </section>
  );
}
