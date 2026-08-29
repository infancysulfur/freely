import { render, screen } from "@testing-library/react";
import { CurrencyInput } from "@/components/common/currency-input";
import { PercentageInput } from "@/components/common/percentage-input";
import { ResultCard } from "@/components/common/result-card";
import { CalculatorGuide } from "@/components/calculators/calculator-guide";

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

  it("renders calculator guide sections", () => {
    render(
      <CalculatorGuide
        notes={["참고용 계산 결과입니다."]}
        formulaTitle="계산 방법"
        formula={["결과 = 입력값 기준 계산"]}
        faqs={[{ question: "Q. 무엇을 알 수 있나요?", answer: "A. 계산 결과를 확인할 수 있습니다." }]}
      />,
    );

    expect(screen.getByText("참고사항")).toBeInTheDocument();
    expect(screen.getByText("계산 방법")).toBeInTheDocument();
    expect(screen.getByText("자주 묻는 질문")).toBeInTheDocument();
  });
});
