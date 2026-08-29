import Link from "next/link";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link className="text-lg font-semibold" href="/">
          FREELY
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <span>계산기</span>
          <span>FIRE</span>
          <span>문서 기준 MVP</span>
        </nav>
      </div>
    </header>
  );
}
