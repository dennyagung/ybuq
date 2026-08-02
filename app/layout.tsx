import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BUQ Studio — Strategi, Desain & Teknologi",
  description: "Studio digital independen untuk strategi, desain, dan pengembangan website.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body className={manrope.variable}>{children}</body></html>;
}
