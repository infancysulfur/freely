import Link from "next/link";

const calculatorCategories = [
  {
    name: "투자 계산기",
    items: [
      { name: "복리 계산기", href: "/calculators/investment/compound" },
      { name: "목표금액 계산기", href: "/calculators/investment/target" },
      { name: "배당금 계산기", href: "/calculators/investment/dividend" },
    ],
  },
  {
    name: "대출 계산기",
    items: [
      { name: "원리금균등상환", href: "/calculators/loan/equal-payment" },
      { name: "원금균등상환", href: "/calculators/loan/equal-principal" },
      { name: "만기일시상환", href: "/calculators/loan/bullet-payment" },
    ],
  },
  {
    name: "저축 계산기",
    items: [
      { name: "예금 계산기", href: "/calculators/savings/deposit" },
      { name: "적금 계산기", href: "/calculators/savings/installment" },
    ],
  },
  {
    name: "FIRE 계산기",
    items: [
      { name: "FIRE 계산기", href: "/calculators/fire" },
    ],
  },
];

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link className="text-lg font-semibold" href="/">
          FREELY
        </Link>
        <nav
          aria-label="주요 메뉴"
          className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex"
        >
          {/* 계산기 드롭다운 메뉴 */}
          <div className="group relative">
            <span className="cursor-pointer transition-colors hover:text-foreground">
              계산기
            </span>
            <div className="absolute left-0 top-full hidden pt-2 group-hover:block">
              <div className="min-w-[200px] rounded-md border bg-background p-2 shadow-md">
                {calculatorCategories.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                      {category.name}
                    </p>
                    {category.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/calculators/fire"
            className="transition-colors hover:text-foreground"
          >
            FIRE
          </Link>

          <Link
            href="/docs"
            className="transition-colors hover:text-foreground"
          >
            문서 기준 MVP
          </Link>
        </nav>
      </div>
    </header>
  );
}
