export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 FREELY</p>
        <p>계산 결과는 사용자가 입력한 가정을 기반으로 한 참고용 시뮬레이션입니다.</p>
      </div>
    </footer>
  );
}
