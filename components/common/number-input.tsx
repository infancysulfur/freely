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

/**
 * 숫자를 3자리마다 콤마를 넣어 포맷한다.
 * 예: "3000000" → "3,000,000", "7.5" → "7.5"
 */
function formatWithCommas(value: string): string {
  const negative = value.startsWith("-");
  const raw = negative ? value.slice(1) : value;

  const [integer, decimal] = raw.split(".");
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const result = decimal !== undefined ? `${formatted}.${decimal}` : formatted;

  return negative ? `-${result}` : result;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ id, label, unit, error, className, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement | null>(null);

    // 컴포넌트 마운트 시 기본값에 콤마를 추가하여 표시한다.
    React.useEffect(() => {
      const el = internalRef.current;
      if (el && el.value) {
        el.value = formatWithCommas(el.value);
      }
    }, []);

    // 외부 ref와 내부 ref를 병합한다.
    const mergedRef = React.useCallback(
      (el: HTMLInputElement | null) => {
        internalRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [ref],
    );

    // 입력값에 콤마를 추가하여 표시하고, 콤마를 제거한 값을 상위 컴포넌트에 전달한다.
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value.replace(/,/g, "");
        if (raw === "" || raw === "-" || /^-?\d*\.?\d*$/.test(raw)) {
          event.target.value = formatWithCommas(raw);
          onChange?.(event);
        }
      },
      [onChange],
    );

    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            ref={mergedRef}
            id={id}
            type="text"
            inputMode="decimal"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={className}
            onChange={handleChange}
            {...props}
          />
          {unit ? <span className="shrink-0 text-sm text-muted-foreground">{unit}</span> : null}
        </div>
        <div id={`${id}-error`}>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";
