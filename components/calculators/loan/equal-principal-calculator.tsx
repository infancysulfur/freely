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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { simulateEqualPrincipalLoan } from "@/lib/calculations/loan";
import { formatCurrency, parseNumberInput } from "@/lib/format";

const schema = z.object({
  principal: z.string().min(1, "대출 원금을 입력해주세요."),
  annualRate: z.string().min(1, "연 이자율을 입력해주세요."),
  months: z.string().min(1, "대출 기간을 입력해주세요."),
});

type FormValues = z.infer<typeof schema>;

export function EqualPrincipalCalculator() {
  const { register, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { principal: "100000000", annualRate: "5", months: "360" },
    mode: "onChange",
  });
  const values = watch();
  const schedule = useMemo(
    () =>
      simulateEqualPrincipalLoan(
        parseNumberInput(values.principal),
        parseNumberInput(values.annualRate) / 100,
        parseNumberInput(values.months),
      ),
    [values],
  );
  const totalInterest = schedule.reduce((sum, item) => sum + item.interest, 0);
  const firstPayment = schedule[0]?.payment ?? 0;

  return (
    <CalculatorLayout
      title="원금균등상환 계산기"
      description="매월 같은 원금을 갚고, 남은 원금에 따라 이자가 줄어드는 방식을 계산합니다."
      input={
        <Card>
          <CardHeader><CardTitle>입력</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <CurrencyInput id="equalPrincipalPrincipal" label="대출 원금" error={errors.principal?.message} {...register("principal")} />
            <PercentageInput id="equalPrincipalAnnualRate" label="연 이자율" error={errors.annualRate?.message} {...register("annualRate")} />
            <NumberInput id="equalPrincipalMonths" label="대출 기간" unit="개월" error={errors.months?.message} {...register("months")} />
            <Button type="button" className="w-full sm:w-auto">계산하기</Button>
          </CardContent>
        </Card>
      }
      result={
        <ResultCard
          title="첫 달 상환금"
          value={formatCurrency(firstPayment)}
          description="원금균등상환은 시간이 지날수록 월 상환금이 줄어듭니다."
          criteria={[
            `총 이자 ${formatCurrency(totalInterest)}`,
            `총 상환금 ${formatCurrency(parseNumberInput(values.principal) + totalInterest)}`,
          ]}
        />
      }
      details={
        <Card>
          <CardHeader><CardTitle>상환 스케줄 미리보기</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>회차</TableHead>
                  <TableHead>상환금</TableHead>
                  <TableHead>이자</TableHead>
                  <TableHead>남은 원금</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedule.slice(0, 12).map((item) => (
                  <TableRow key={item.month}>
                    <TableCell>{item.month}개월</TableCell>
                    <TableCell>{formatCurrency(item.payment)}</TableCell>
                    <TableCell>{formatCurrency(item.interest)}</TableCell>
                    <TableCell>{formatCurrency(item.remainingPrincipal)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      }
    />
  );
}
