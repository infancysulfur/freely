import { render, screen } from "@testing-library/react";
import { CurrencyInput } from "@/components/common/currency-input";
import { PercentageInput } from "@/components/common/percentage-input";
import { ResultCard } from "@/components/common/result-card";

describe("common UI components", () => {
  it("renders currency input with numeric mobile input mode", () => {
    render(<CurrencyInput id="asset" label="현재 투자자산" />);

    expect(screen.getByLabelText("현재 투자자산")).toHaveAttribute("inputmode", "numeric");
    expect(screen.getByText("원")).toBeInTheDocument();
  });

  it("renders percentage input with decimal mobile input mode", () => {
    render(<PercentageInput id="rate" label="예상 연 수익률" />);

    expect(screen.getByLabelText("예상 연 수익률")).toHaveAttribute("inputmode", "decimal");
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("renders result card values prominently", () => {
    render(<ResultCard title="FIRE 목표자산" value="900,000,000원" />);

    expect(screen.getByText("FIRE 목표자산")).toBeInTheDocument();
    expect(screen.getByText("900,000,000원")).toBeInTheDocument();
  });
});
