import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "バーンアウト・セルフチェック | HITONE",
  description: "あなたの燃え尽きタイプを科学的に分析。8分の無料チェックで、回復の道筋がわかります。Copenhagen Burnout InventoryとBCSQ-12に基づく31問の無料診断。",
  keywords: ["バーンアウト", "燃え尽き症候群", "セルフチェック", "燃え尽き診断", "ストレスチェック", "バーンアウト診断", "燃え尽き タイプ"],
  openGraph: {
    title: "バーンアウト・セルフチェック | HITONE",
    description: "あなたの燃え尽きタイプは？8分の無料チェックで科学的に分析",
    siteName: "HITONE",
    url: "https://burnout.hitone.app",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://burnout.hitone.app" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HITONE バーンアウト・セルフチェック",
  description: "科学的根拠に基づいたバーンアウト（燃え尽き症候群）のセルフチェック。8分・31問で、あなたの燃え尽きタイプと回復の道筋がわかります。",
  url: "https://burnout.hitone.app",
  applicationCategory: "HealthApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  creator: { "@type": "Organization", name: "HITONE" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
