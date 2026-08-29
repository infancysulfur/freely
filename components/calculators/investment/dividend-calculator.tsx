"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CurrencyInput } from "@/components/common/currency-input";
import { PercentageInput } from "@/components/common/percentage-input";
import { ResultCard } from "@/components/common/result-card";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { CalculatorGuide } from "@/components/calculators/calculator-guide";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateDividend } from "@/lib/calculations/investment";
import { calculatorGuides } from "@/lib/calculator-guides";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  investmentAmount: z.string().min(1, "투자금을 입력해주세요."),
  dividendYield: z.string().min(1, "배당수익률을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function DividendCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { investmentAmount: "10000000", dividendYield: "5" },
    mode: "onChange",
  });
  const values = watch();
  const result = useMemo(
    () => calculateDividend(parseNumberInput(values.investmentAmount), parseNumberInput(values.dividendYield) / 100),
    [values],
  );

  return (
    <CalculatorLayout
      title="배당금 계산기"
      description="투자금과 배당수익률을 기준으로 예상 배당금을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput id="investmentAmount" label="투자금" error={errors.investmentAmount?.message} {...register("investmentAmount")} />
            <PercentageInput id="dividendYield" label="배당수익률" error={errors.dividendYield?.message} {...register("dividendYield")} />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <ResultCard
          title="월 평균 배당금"
          value={formatCurrency(result.monthlyAverageDividend)}
          description="실제 지급 주기가 아니라 연간 배당금을 12개월로 나눈 평균값입니다."
          criteria={[`연간 배당금 ${formatCurrency(result.annualDividend)}`]}
        />
      }
      guide={<CalculatorGuide {...calculatorGuides.dividend} />}
    />
  );
}
