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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { calculateCompoundInvestment } from "@/lib/calculations/investment";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  initialAmount: z.string().min(1, "초기 투자금을 입력해주세요."),
  monthlyContribution: z.string().min(1, "월 투자금을 입력해주세요."),
  years: z.string().min(1, "투자 기간을 입력해주세요."),
  annualReturnRate: z.string().min(1, "예상 연 수익률을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

const defaultValues: FormValues = {
  initialAmount: "10000000",
  monthlyContribution: "500000",
  years: "20",
  annualReturnRate: "7",
};

export function CompoundCalculator() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const values = watch();
  const result = useMemo(() => {
    const years = parseNumberInput(values.years);

    return calculateCompoundInvestment({
      initialAmount: parseNumberInput(values.initialAmount),
      monthlyContribution: parseNumberInput(values.monthlyContribution),
      months: years * 12,
      annualReturnRate: parseNumberInput(values.annualReturnRate) / 100,
    });
  }, [values]);

  return (
    <CalculatorLayout
      title="복리 계산기"
      description="초기 투자금과 매월 투자금을 기준으로 미래 자산을 계산합니다."
      input={
        <Card>
          <CardHeader>
            <CardTitle>입력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput label="초기 투자금" error={errors.initialAmount?.message} {...register("initialAmount")} id="initialAmount" />
            <CurrencyInput label="월 투자금" error={errors.monthlyContribution?.message} {...register("monthlyContribution")} id="monthlyContribution" />
            <NumberInput label="투자 기간" unit="년" error={errors.years?.message} {...register("years")} id="years" />
            <PercentageInput label="예상 연 수익률" error={errors.annualReturnRate?.message} {...register("annualReturnRate")} id="annualReturnRate" />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <div className="space-y-4">
          <ResultCard
            title="예상 최종 자산"
            value={formatCurrency(result.finalAsset)}
            description="월말 납입과 월 단위 복리를 기준으로 계산했습니다."
            criteria={[
              `총 투자 원금 ${formatCurrency(result.totalPrincipal)}`,
              `예상 투자 수익 ${formatCurrency(result.investmentReturn)}`,
            ]}
          />
          <Alert>
            <AlertTitle>계산 기준</AlertTitle>
            <AlertDescription>
              중간 계산값은 반올림하지 않고, 화면 표시 단계에서만 원 단위로 표시합니다.
            </AlertDescription>
          </Alert>
        </div>
      }
    />
  );
}
