import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peringatan Maulid Nabi Muhammad SAW di Masjid Al-Huda | YBUQ",
  description: "Peringatan Maulid Nabi Muhammad SAW pada 23 Agustus 2026 di Masjid Al-Huda Mangga Bolong, Srengseng Sawah, Jagakarsa, Jakarta Selatan.",
  alternates: { canonical: "/aktivitas/maulid-nabi-muhammad-masjid-al-huda" },
  openGraph: {
    title: "Peringatan Maulid Nabi Muhammad SAW di Masjid Al-Huda",
    description: "Peringatan Maulid Nabi Muhammad SAW bersama jamaah Masjid Al-Huda pada 23 Agustus 2026.",
    images: ["https://ybuq.or.id/maulid-nabi-masjid-al-huda-2026.jpeg"],
  },
};

export default function MaulidLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
