"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { z } from "zod";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { CurrencyInput } from "@/components/common/currency-input";
import { NumberInput } from "@/components/common/number-input";
import { PercentageInput } from "@/components/common/percentage-input";
import { ResultCard } from "@/components/common/result-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { calculateFireProgress, calculateFireTarget, simulateFire } from "@/lib/calculations/fire";
import { formatCurrency, formatNumber, parseNumberInput } from "@/lib/format";

const schema = z.object({
  monthlyExpense: z.string().min(1, "월 생활비를 입력해주세요."),
  currentAsset: z.string().min(1, "현재 투자 가능 자산을 입력해주세요."),
  monthlyInvestment: z.string().min(1, "월 투자금을 입력해주세요."),
  currentAge: z.string().min(1, "현재 나이를 입력해주세요."),
  annualReturnRate: z.string().min(1, "예상 연 수익률을 입력해주세요."),
  withdrawalRate: z.string().min(1, "목표 인출률을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function FireCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      monthlyExpense: "3000000",
      currentAsset: "200000000",
      monthlyInvestment: "2000000",
      currentAge: "30",
      annualReturnRate: "7",
      withdrawalRate: "4",
    },
    mode: "onChange",
  });
  const values = watch();
  const result = useMemo(() => {
    const targetAsset = calculateFireTarget(
      parseNumberInput(values.monthlyExpense),
      parseNumberInput(values.withdrawalRate) / 100,
    );
    const progress = calculateFireProgress(parseNumberInput(values.currentAsset), targetAsset);
    const simulation = simulateFire({
      currentAge: parseNumberInput(values.currentAge),
      currentAsset: parseNumberInput(values.currentAsset),
      monthlyInvestment: parseNumberInput(values.monthlyInvestment),
      annualReturnRate: parseNumberInput(values.annualReturnRate) / 100,
      targetAsset,
    });

    return {
      targetAsset,
      progress,
      remainingAsset: Math.max(targetAsset - parseNumberInput(values.currentAsset), 0),
      simulation,
    };
  }, [values]);

  const chartData = result.simulation.points
    .filter((point) => point.month % 12 === 0 || point.month === result.simulation.monthsToFire)
    .map((point) => ({
      age: formatNumber(point.age, 1),
      asset: Math.round(point.asset / 100_000_000),
      target: Math.round(result.targetAsset / 100_000_000),
    }));

  return (
    <CalculatorLayout
      title="FIRE 계산기"
      description="경제적 자유까지 필요한 자산과 예상 달성 시점을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-base font-semibold">생활비</h2>
              <CurrencyInput id="monthlyExpense" label="월 생활비" error={errors.monthlyExpense?.message} {...register("monthlyExpense")} />
            </div>
            <div className="space-y-4">
              <h2 className="text-base font-semibold">현재 자산 / 투자</h2>
              <CurrencyInput id="currentAsset" label="현재 투자 가능 자산" error={errors.currentAsset?.message} {...register("currentAsset")} />
              <CurrencyInput id="monthlyInvestment" label="월 투자금" error={errors.monthlyInvestment?.message} {...register("monthlyInvestment")} />
              <NumberInput id="currentAge" label="현재 나이" unit="세" error={errors.currentAge?.message} {...register("currentAge")} />
            </div>
            <div className="space-y-4">
              <h2 className="text-base font-semibold">투자 가정</h2>
              <PercentageInput id="annualReturnRate" label="예상 연 수익률" error={errors.annualReturnRate?.message} {...register("annualReturnRate")} />
              <PercentageInput id="withdrawalRate" label="목표 인출률" error={errors.withdrawalRate?.message} {...register("withdrawalRate")} />
            </div>
            <Button type="button" className="w-full sm:w-auto">내 FIRE 계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <div className="space-y-4">
          <ResultCard
            title="당신의 FIRE 목표자산"
            value={formatCurrency(result.targetAsset)}
            description={`현재 FIRE 달성률 ${formatNumber(result.progress, 1)}%`}
            criteria={[
              `현재 투자자산 ${formatCurrency(parseNumberInput(values.currentAsset))}`,
              `남은 자산 ${formatCurrency(result.remainingAsset)}`,
              result.simulation.fireAge
                ? `예상 FIRE 나이 ${formatNumber(result.simulation.fireAge, 1)}세`
                : "현재 조건에서는 100년 이내 목표 도달 시점을 찾지 못했습니다.",
            ]}
          />
          <Card>
            <CardHeader><CardTitle>FIRE 달성률</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Progress value={result.progress} />
              <p className="text-sm leading-6 text-muted-foreground">
                목표자산 {formatCurrency(result.targetAsset)} 중 현재 {formatCurrency(parseNumberInput(values.currentAsset))}을 보유하고 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      }
      details={
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>자산 성장 그래프</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis tickFormatter={(value: number) => `${value}억`} />
                  <Tooltip
                    formatter={(value) => `${Number(value ?? 0)}억원`}
                    labelFormatter={(label) => `${label}세`}
                  />
                  <Line type="monotone" dataKey="asset" name="예상 자산" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="target" name="목표자산" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Alert>
            <AlertTitle>주의사항</AlertTitle>
            <AlertDescription>
              이 계산 결과는 입력한 조건을 기반으로 한 시뮬레이션입니다. 실제 투자수익률,
              물가, 세금, 투자상품의 변동성에 따라 실제 결과는 달라질 수 있습니다.
            </AlertDescription>
          </Alert>
        </div>
      }
    />
  );
}
