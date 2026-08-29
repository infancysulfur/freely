import * as React from "react";
import { NumberInput, type NumberInputProps } from "@/components/common/number-input";

export const CurrencyInput = React.forwardRef<HTMLInputElement, Omit<NumberInputProps, "unit" | "inputMode">>(
  (props, ref) => <NumberInput ref={ref} unit="원" inputMode="numeric" {...props} />,
);
CurrencyInput.displayName = "CurrencyInput";
