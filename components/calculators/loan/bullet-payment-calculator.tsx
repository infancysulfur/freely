"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { CurrencyInput } from "@/components/common/currency-input";
import { NumberInput } from "@/components/common/number-input";
import { PercentageInput } from "@/components/common/percentage-input";
import { ResultCard } from "@/components/common/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateBulletPaymentLoan } from "@/lib/calculations/loan";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  principal: z.string().min(1, "대출 원금을 입력해주세요."),
  annualRate: z.string().min(1, "연 이자율을 입력해주세요."),
  months: z.string().min(1, "대출 기간을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function BulletPaymentCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { principal: "100000000", annualRate: "5", months: "12" },
    mode: "onChange",
  });
  const values = watch();
  const result = useMemo(
    () =>
      calculateBulletPaymentLoan(
        parseNumberInput(values.principal),
        parseNumberInput(values.annualRate) / 100,
        parseNumberInput(values.months),
      ),
    [values],
  );

  return (
    <CalculatorLayout
      title="만기일시상환 계산기"
      description="대출 기간 동안 이자를 납부하고 만기에 원금을 갚는 방식을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput id="bulletPrincipal" label="대출 원금" error={errors.principal?.message} {...register("principal")} />
            <PercentageInput id="bulletAnnualRate" label="연 이자율" error={errors.annualRate?.message} {...register("annualRate")} />
            <NumberInput id="bulletMonths" label="대출 기간" unit="개월" error={errors.months?.message} {...register("months")} />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <ResultCard
          title="월 이자"
          value={formatCurrency(result.monthlyInterest)}
          description="만기 전에는 이자만 납부하고 만기에 원금을 상환하는 기준입니다."
          criteria={[
            `총 이자 ${formatCurrency(result.totalInterest)}`,
            `총 상환금 ${formatCurrency(result.totalPayment)}`,
          ]}
        />
      }
    />
  );
}
