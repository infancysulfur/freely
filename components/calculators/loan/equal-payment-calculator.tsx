"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { CalculatorGuide } from "@/components/calculators/calculator-guide";
import { CurrencyInput } from "@/components/common/currency-input";
import { NumberInput } from "@/components/common/number-input";
import { PercentageInput } from "@/components/common/percentage-input";
import { ResultCard } from "@/components/common/result-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateEqualPaymentLoan } from "@/lib/calculations/loan";
import { calculatorGuides } from "@/lib/calculator-guides";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  principal: z.string().min(1, "대출 원금을 입력해주세요."),
  annualRate: z.string().min(1, "연 이자율을 입력해주세요."),
  months: z.string().min(1, "대출 기간을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function EqualPaymentCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { principal: "100000000", annualRate: "5", months: "360" },
    mode: "onChange",
  });
  const values = watch();
  const result = useMemo(
    () =>
      calculateEqualPaymentLoan(
        parseNumberInput(values.principal),
        parseNumberInput(values.annualRate) / 100,
        parseNumberInput(values.months),
      ),
    [values],
  );

  return (
    <CalculatorLayout
      title="원리금균등상환 계산기"
      description="대출 기간 동안 매월 같은 금액을 갚는 상환 방식을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput id="equalPaymentPrincipal" label="대출 원금" error={errors.principal?.message} {...register("principal")} />
            <PercentageInput id="equalPaymentAnnualRate" label="연 이자율" error={errors.annualRate?.message} {...register("annualRate")} />
            <NumberInput id="equalPaymentMonths" label="대출 기간" unit="개월" error={errors.months?.message} {...register("months")} />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <ResultCard
          title="월 상환금"
          value={formatCurrency(result.monthlyPayment)}
          description="원리금균등상환 공식 기준으로 계산했습니다."
          criteria={[
            `총 이자 ${formatCurrency(result.totalInterest)}`,
            `총 상환금 ${formatCurrency(result.totalPayment)}`,
          ]}
        />
      }
      guide={<CalculatorGuide {...calculatorGuides.equalPaymentLoan} />}
    />
  );
}
