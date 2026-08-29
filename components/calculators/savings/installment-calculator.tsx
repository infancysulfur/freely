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
import { calculateInstallmentSavings } from "@/lib/calculations/savings";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  monthlyPayment: z.string().min(1, "월 납입금을 입력해주세요."),
  annualRate: z.string().min(1, "연 이자율을 입력해주세요."),
  months: z.string().min(1, "기간을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function InstallmentCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { monthlyPayment: "500000", annualRate: "3", months: "12" },
    mode: "onChange",
  });
  const values = watch();
  const result = useMemo(
    () =>
      calculateInstallmentSavings(
        parseNumberInput(values.monthlyPayment),
        parseNumberInput(values.annualRate) / 100,
        parseNumberInput(values.months),
      ),
    [values],
  );

  return (
    <CalculatorLayout
      title="적금 계산기"
      description="월 납입금 기준으로 총 납입금과 세전 만기 금액을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput id="monthlyPayment" label="월 납입금" error={errors.monthlyPayment?.message} {...register("monthlyPayment")} />
            <PercentageInput id="installmentAnnualRate" label="연 이자율" error={errors.annualRate?.message} {...register("annualRate")} />
            <NumberInput id="installmentMonths" label="기간" unit="개월" error={errors.months?.message} {...register("months")} />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <ResultCard
          title="세전 만기 금액"
          value={formatCurrency(result.maturityAmount)}
          description="월말 납입 기준으로 계산한 단순 적금 결과입니다."
          criteria={[
            `총 납입금 ${formatCurrency(result.totalContribution)}`,
            `세전 이자 ${formatCurrency(result.beforeTaxInterest)}`,
          ]}
        />
      }
    />
  );
}
