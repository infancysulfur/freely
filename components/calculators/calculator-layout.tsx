import type { ReactNode } from "react";

export interface CalculatorLayoutProps {
  title: string;
  description: string;
  input: ReactNode;
  result: ReactNode;
  details?: ReactNode;
}

export function CalculatorLayout({ title, description, input, result, details }: CalculatorLayoutProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12 sm:py-16">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div>{input}</div>
        <div>{result}</div>
      </div>
      {details ? <div>{details}</div> : null}
    </section>
  );
}
