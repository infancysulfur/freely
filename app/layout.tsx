import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const baseUrl = "https://freely-78hbdkt9d-infancysulfurs-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "FREELY — 돈을 계산하고 미래를 설계하세요",
    template: "%s | FREELY",
  },
  description:
    "투자, 대출, 저축, FIRE 계산기를 무료로 사용할 수 있는 개인 금융 계산 서비스입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "FREELY",
    title: "FREELY — 돈을 계산하고 미래를 설계하세요",
    description:
      "투자, 대출, 저축, FIRE 계산기를 무료로 사용할 수 있는 개인 금융 계산 서비스입니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FREELY — 돈을 계산하고 미래를 설계하세요",
    description:
      "투자, 대출, 저축, FIRE 계산기를 무료로 사용할 수 있는 개인 금융 계산 서비스입니다.",
  },
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: "DYRoSjxA8kUL_nB-IHi6dGDSuyFbqcNBWsWHfAVSmdU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
