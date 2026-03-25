import type { Metadata } from "next";
import { Noto_Sans_JP, Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "横国 サーチる",
  description: "横国サークル検索サイト",
  icons: {
    icon: [
      {
        url: "/icon/rumors_icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={cn("font-sans", geist.variable)}>
      <body
        className={`${notoSansJP.variable} font-sans`}
        style={{ backgroundColor: "#C0C0C0" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
