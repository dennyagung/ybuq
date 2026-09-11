import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kuliah Subuh Subulussalam di Musholla Baitul Muslimin | YBUQ",
  description: "Majelis Taklim Kuliah Subuh Subulussalam, pengajian rutin Sabtu subuh se-Kelurahan Srengseng Sawah pada 22 Agustus 2026 di Musholla Baitul Muslimin.",
  alternates: { canonical: "/aktivitas/majelis-taklim-kuliah-subuh-subulussalam" },
};

export default function MajelisTaklimLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
