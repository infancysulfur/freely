import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the FREELY landing content without calculation logic", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: /돈을 계산하고/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "계산기 둘러보기" })).toHaveAttribute(
      "href",
      "/calculators",
    );
  });
});
