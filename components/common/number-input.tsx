import * as React from "react";
import { ErrorMessage } from "@/components/common/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  label: string;
  unit?: string;
  error?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ id, label, unit, error, className, ...props }, ref) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          ref={ref}
          id={id}
          type="text"
          inputMode="decimal"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={className}
          {...props}
        />
        {unit ? <span className="shrink-0 text-sm text-muted-foreground">{unit}</span> : null}
      </div>
      <div id={`${id}-error`}>
        <ErrorMessage message={error} />
      </div>
    </div>
  ),
);
NumberInput.displayName = "NumberInput";
