import type { Metadata } from "next";
import { Manrope, Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./fontawesome-contact.css";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Yayasan Bina Ummah Qur'aniyah",
  description: "Yayasan Bina Ummah Qur'aniyah untuk pendidikan, pembinaan, dan pemberdayaan umat.",
  icons: {
    icon: [{ url: "/logo-ybuq-2026.png", type: "image/png" }],
    shortcut: "/logo-ybuq-2026.png",
    apple: "/logo-ybuq-2026.png",
  },
};

import { LanguageProvider } from "./LanguageContext";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${manrope.variable} ${poppins.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}