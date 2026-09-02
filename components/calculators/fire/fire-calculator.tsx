"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CurrencyInput } from "@/components/common/currency-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateFireTarget,
  calculateTotalContributions,
  calculateTotalInvestmentReturn,
  formatMonthsToYearsAndMonths,
  simulateFire,
} from "@/lib/calculations/fire";
import { formatCurrency, formatNumber, parseNumberInput } from "@/lib/format";

const schema = z.object({
  monthlyExpense: z.string().min(1, "월 생활비를 입력해주세요."),
  currentAsset: z.string().min(1, "현재 자산을 입력해주세요."),
  monthlySavings: z.string().min(1, "월 저축액을 입력해주세요."),
  annualReturnRate: z.string().min(1, "연 수익률을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

/**
 * FIRE 계산기 — 경제적 자유까지 필요한 자산과 달성 시점을 계산하는 컴포넌트.
 *
 * 디자인: 좌측 입력 / 우측 결과 카드 배치.
 * 연 수익률은 슬라이더로 조절.
 */
export function FireCalculator() {
  const { register, watch, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      monthlyExpense: "3000000",
      currentAsset: "50000000",
      monthlySavings: "1500000",
      annualReturnRate: "6",
    },
    mode: "onChange",
  });

  const values = watch();
  const annualReturnRate = parseNumberInput(values.annualReturnRate);

  const result = useMemo(() => {
    const monthlyExpense = parseNumberInput(values.monthlyExpense);
    const currentAsset = parseNumberInput(values.currentAsset);
    const monthlySavings = parseNumberInput(values.monthlySavings);
    const returnRate = parseNumberInput(values.annualReturnRate) / 100;

    // FIRE 목표 자산은 4% 인출률 기준 (연간 생활비 × 25).
    const targetAsset = calculateFireTarget(monthlyExpense, 0.04);
    const yearsToFire = formatMonthsToYearsAndMonths(
      simulateFire({
        currentAge: 30,
        currentAsset,
        monthlyInvestment: monthlySavings,
        annualReturnRate: returnRate,
        targetAsset,
      }).monthsToFire,
    );
    const annualWithdrawal = monthlyExpense * 12;
    const totalContributions = calculateTotalContributions(
      currentAsset,
      monthlySavings,
      simulateFire({
        currentAge: 30,
        currentAsset,
        monthlyInvestment: monthlySavings,
        annualReturnRate: returnRate,
        targetAsset,
      }).monthsToFire,
    );
    const totalReturn = calculateTotalInvestmentReturn(
      currentAsset,
      monthlySavings,
      simulateFire({
        currentAge: 30,
        currentAsset,
        monthlyInvestment: monthlySavings,
        annualReturnRate: returnRate,
        targetAsset,
      }),
    );
    const isAchievable = simulateFire({
      currentAge: 30,
      currentAsset,
      monthlyInvestment: monthlySavings,
      annualReturnRate: returnRate,
      targetAsset,
    }).monthsToFire !== null;
    const returnRatePercent = totalContributions > 0
      ? (totalReturn / totalContributions) * 100
      : 0;

    return {
      targetAsset,
      yearsToFire,
      annualWithdrawal,
      totalContributions,
      totalReturn,
      isAchievable,
      returnRatePercent,
      simulation: simulateFire({
        currentAge: 30,
        currentAsset,
        monthlyInvestment: monthlySavings,
        annualReturnRate: returnRate,
        targetAsset,
      }),
    };
  }, [values]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        {/* ── 좌측: 입력 ── */}
        <Card>
          <CardHeader>
            <CardTitle>입력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CurrencyInput
              id="monthlyExpense"
              label="월 생활비"
              {...register("monthlyExpense")}
            />
            <CurrencyInput
              id="currentAsset"
              label="현재 자산"
              {...register("currentAsset")}
            />
            <CurrencyInput
              id="monthlySavings"
              label="월 저축액"
              {...register("monthlySavings")}
            />

            {/* 연 수익률 — 슬라이더 + 숫자 표시 */}
            <div className="space-y-3">
              <Label htmlFor="annualReturnRate">연 수익률</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="annualReturnRate"
                  type="text"
                  inputMode="decimal"
                  className="w-20 text-center"
                  {...register("annualReturnRate")}
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
              <input
                type="range"
                min={0}
                max={20}
                step={0.5}
                value={annualReturnRate}
                onChange={(e) => setValue("annualReturnRate", e.target.value)}
                className="fire-slider h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[hsl(var(--primary))]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>20%</span>
              </div>
            </div>

            <Button type="button" className="w-full">
              내 FIRE 계산하기
            </Button>
          </CardContent>
        </Card>

        {/* ── 우측: 결과 ── */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">경제적 자유까지</h2>

          {/* FIRE 목표 자산 */}
          <Card>
            <CardContent className="pt-6">
              <p className="mb-1 text-sm text-muted-foreground">
                FIRE 목표 자산 (4% 용)
              </p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {formatCurrency(result.targetAsset)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                연 지출{" "}
                {formatCurrency(parseNumberInput(values.monthlyExpense) * 12)} × 25
              </p>
            </CardContent>
          </Card>

          {/* 목표 도달까지 */}
          <Card>
            <CardContent className="pt-6">
              <p className="mb-1 text-sm text-muted-foreground">목표 도달까지</p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {result.yearsToFire}
              </p>
              <div className="mt-2 flex items-center gap-2">
                {result.isAchievable ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                    <span className="text-emerald-500">▲</span> 도달 가능
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                    <span className="text-red-500">▼</span> 현재 조건으로는 도달 어려움
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                연 {annualReturnRate}% 기준
              </p>
            </CardContent>
          </Card>

          {/* 연 인출 가능액 */}
          <Card>
            <CardContent className="pt-6">
              <p className="mb-1 text-sm text-muted-foreground">
                연 인출 가능액 (4% 용)
              </p>
              <p className="text-3xl font-bold tracking-tight text-foreground">
                {formatCurrency(result.annualWithdrawal)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                월 {formatCurrency(parseNumberInput(values.monthlyExpense))}
              </p>
            </CardContent>
          </Card>

          {/* 총 납입 원금 + 총 투자 수익 (나란히) */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="mb-1 text-sm text-muted-foreground">총 납입 원금</p>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {formatCurrency(result.totalContributions)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-1 text-sm text-muted-foreground">총 투자 수익</p>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {formatCurrency(result.totalReturn)}
                </p>
                <div className="mt-1 flex items-center gap-1">
                  <span className="text-sm font-medium text-emerald-600">
                    ▲ {formatNumber(result.returnRatePercent, 1)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 하단 링크 */}
          <Link
            href="/docs/calculations"
            className="inline-block text-sm font-medium text-[hsl(var(--primary))] hover:underline"
          >
            파이어족·4%를 자세히 →
          </Link>
        </div>
      </div>
    </section>
  );
}
