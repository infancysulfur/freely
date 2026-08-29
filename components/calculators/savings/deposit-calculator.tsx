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
import { calculateDeposit } from "@/lib/calculations/savings";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  principal: z.string().min(1, "예치금을 입력해주세요."),
  annualRate: z.string().min(1, "연 이자율을 입력해주세요."),
  years: z.string().min(1, "기간을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function DepositCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { principal: "10000000", annualRate: "3", years: "1" },
    mode: "onChange",
  });
  const values = watch();
  const result = useMemo(
    () => calculateDeposit(parseNumberInput(values.principal), parseNumberInput(values.annualRate) / 100, parseNumberInput(values.years)),
    [values],
  );

  return (
    <CalculatorLayout
      title="예금 계산기"
      description="예치금, 이자율, 기간을 기준으로 세전 만기 금액을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput id="depositPrincipal" label="예치금" error={errors.principal?.message} {...register("principal")} />
            <PercentageInput id="depositAnnualRate" label="연 이자율" error={errors.annualRate?.message} {...register("annualRate")} />
            <NumberInput id="depositYears" label="기간" unit="년" error={errors.years?.message} {...register("years")} />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <ResultCard
          title="세전 만기 금액"
          value={formatCurrency(result.maturityAmount)}
          description="세후 이자는 적용 세율 정책 확정 후 구현합니다."
          criteria={[`세전 이자 ${formatCurrency(result.beforeTaxInterest)}`]}
        />
      }
    />
  );
}
