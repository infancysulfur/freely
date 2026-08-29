import * as React from "react";
import { NumberInput, type NumberInputProps } from "@/components/common/number-input";

export const PercentageInput = React.forwardRef<HTMLInputElement, Omit<NumberInputProps, "unit" | "inputMode">>(
  (props, ref) => <NumberInput ref={ref} unit="%" inputMode="decimal" {...props} />,
);
PercentageInput.displayName = "PercentageInput";
