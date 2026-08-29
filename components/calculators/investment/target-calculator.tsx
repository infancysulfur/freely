"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CurrencyInput } from "@/components/common/currency-input";
import { NumberInput } from "@/components/common/number-input";
import { PercentageInput } from "@/components/common/percentage-input";
import { ResultCard } from "@/components/common/result-card";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { CalculatorGuide } from "@/components/calculators/calculator-guide";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateRequiredMonthlyContribution } from "@/lib/calculations/investment";
import { calculatorGuides } from "@/lib/calculator-guides";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  currentAsset: z.string().min(1, "현재 자산을 입력해주세요."),
  targetAsset: z.string().min(1, "목표 자산을 입력해주세요."),
  years: z.string().min(1, "투자 기간을 입력해주세요."),
  annualReturnRate: z.string().min(1, "예상 연 수익률을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function TargetCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentAsset: "10000000",
      targetAsset: "100000000",
      years: "10",
      annualReturnRate: "7",
    },
    mode: "onChange",
  });
  const values = watch();
  const monthlyContribution = useMemo(
    () =>
      calculateRequiredMonthlyContribution(
        parseNumberInput(values.targetAsset),
        parseNumberInput(values.currentAsset),
        parseNumberInput(values.years) * 12,
        parseNumberInput(values.annualReturnRate) / 100,
      ),
    [values],
  );

  return (
    <CalculatorLayout
      title="목표금액 계산기"
      description="목표 자산을 만들기 위해 매월 필요한 투자금을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput id="currentAsset" label="현재 자산" error={errors.currentAsset?.message} {...register("currentAsset")} />
            <CurrencyInput id="targetAsset" label="목표 자산" error={errors.targetAsset?.message} {...register("targetAsset")} />
            <NumberInput id="targetYears" label="투자 기간" unit="년" error={errors.years?.message} {...register("years")} />
            <PercentageInput id="targetReturnRate" label="예상 연 수익률" error={errors.annualReturnRate?.message} {...register("annualReturnRate")} />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <ResultCard
          title="필요한 월 투자금"
          value={formatCurrency(monthlyContribution)}
          description="목표 자산과 투자 기간, 예상 수익률을 기준으로 계산했습니다."
          criteria={[`목표 자산 ${formatCurrency(parseNumberInput(values.targetAsset))}`]}
        />
      }
      guide={<CalculatorGuide {...calculatorGuides.target} />}
    />
  );
}
