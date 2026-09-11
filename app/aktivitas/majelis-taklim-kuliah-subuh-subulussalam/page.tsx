"use client";

import SiteFooter from "../../SiteFooter";
import SiteHeader from "../../SiteHeader";
import { useLanguage } from "../../LanguageContext";
import { translations } from "../../translations";

const copy = {
  id: { category: "Majelis Taklim", title: "Kuliah Subuh Subulussalam di Musholla Baitul Muslimin", date: "22 Agustus 2026", lead: "Majelis Taklim Kuliah Subuh Subulussalam kembali menyelenggarakan pengajian rutin setiap Sabtu subuh untuk masyarakat se-Kelurahan Srengseng Sawah.", heading: "Pengajian Rutin Sabtu Subuh", body: "Kegiatan pada Sabtu, 22 Agustus 2026, bertempat di Musholla Baitul Muslimin. Majelis diisi dengan pembacaan kitab oleh Prof. (Associate) Dr. Abdurrakhim Hadan, SQ., M.A., dilanjutkan tausiyah oleh penceramah Dr. Hidayaturrahman, S.H., M.Pd.I.", closing: "Kegiatan ini menjadi ruang silaturahmi, pembelajaran agama, dan penguatan kebersamaan umat di wilayah Srengseng Sawah." },
  en: { category: "Islamic Study Circle", title: "Subulussalam Dawn Study at Baitul Muslimin Prayer Hall", date: "August 22, 2026", lead: "The Subulussalam Dawn Study Circle held its weekly Saturday dawn gathering for residents across Srengseng Sawah.", heading: "Weekly Saturday Dawn Study", body: "The gathering on Saturday, August 22, 2026, took place at Baitul Muslimin Prayer Hall. Prof. (Associate) Dr. Abdurrakhim Hadan, SQ., M.A. led the classical text reading, followed by a sermon from Dr. Hidayaturrahman, S.H., M.Pd.I.", closing: "The program strengthens fellowship, Islamic learning, and community bonds throughout Srengseng Sawah." },
  ar: { category: "مجلس التعليم", title: "درس الفجر سبل السلام في مصلى بيت المسلمين", date: "22 أغسطس 2026", lead: "أقام مجلس تعليم سبل السلام لقاءه الأسبوعي صباح السبت لأهالي منطقة سرينغسينغ ساواه.", heading: "درس أسبوعي صباح السبت", body: "أقيم اللقاء يوم السبت 22 أغسطس 2026 في مصلى بيت المسلمين، وتضمن قراءة الكتاب للأستاذ المشارك الدكتور عبد الرحيم هادان، ثم محاضرة للدكتور هداية الرحمن.", closing: "يسهم هذا النشاط في تعزيز صلة الرحم والتعليم الإسلامي وروابط المجتمع في سرينغسينغ ساواه." },
};

export default function MajelisTaklimPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const navT = translations[lang].nav;
  return (
    <div className="article-page">
      <SiteHeader />
      <main className="inner-main">
        <section className="article-hero">
          <img src="/majelis-taklim-kuliah-subuh-subulussalam-2026.png" alt={t.title} />
          <div className="article-hero-overlay" />
          <div className="container article-hero-copy"><span>{t.category}</span><h1>{t.title}</h1><div className="article-meta"><i className="bi bi-calendar3" aria-hidden="true" /> {t.date} <span>•</span> <i className="bi bi-person" aria-hidden="true" /> YBUQ</div></div>
        </section>
        <article className="article-content"><div className="container article-container">
          <nav className="article-breadcrumb" aria-label="Breadcrumb"><a href="/">{navT.beranda}</a><span>/</span><a href="/aktivitas">{navT.aktivitas}</a><span>/</span><strong>{t.category}</strong></nav>
          <p className="article-lead">{t.lead}</p>
          <section className="article-section" aria-labelledby="majelis-heading"><div className="article-section-heading"><span><i className="bi bi-moon-stars-fill" aria-hidden="true" /></span><div><p>{t.category}</p><h2 id="majelis-heading">{t.heading}</h2></div></div><p>{t.body}</p><p>{t.closing}</p></section>
        </div></article>
      </main>
      <SiteFooter />
    </div>
  );
}

