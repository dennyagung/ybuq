"use client";

import SiteFooter from "../../SiteFooter";
import SiteHeader from "../../SiteHeader";
import { useLanguage } from "../../LanguageContext";
import { translations } from "../../translations";

const copy = {
  id: {
    category: "Peringatan Maulid",
    title: "Peringatan Maulid Nabi Muhammad SAW di Masjid Al-Huda",
    date: "23 Agustus 2026",
    lead: "Jamaah Masjid Al-Huda bersama masyarakat sekitar memperingati Maulid Nabi Muhammad SAW sebagai momentum meningkatkan kecintaan kepada Rasulullah dan meneladani akhlak beliau.",
    heading: "Meneladani Akhlak Rasulullah SAW",
    body: "Kegiatan dilaksanakan pada 23 Agustus 2026 di Masjid Al-Huda Mangga Bolong RT 07, Srengseng Sawah, Jagakarsa, Jakarta Selatan 12640. Jamaah mengikuti rangkaian peringatan dengan khidmat dalam suasana penuh kebersamaan.",
    closing: "Peringatan Maulid ini diharapkan memperkuat keimanan, mempererat silaturahmi, serta mendorong jamaah untuk menghadirkan keteladanan Nabi Muhammad SAW dalam kehidupan sehari-hari.",
    galleryTitle: "Dokumentasi Kegiatan",
    galleryCaption: "Suasana Peringatan Maulid Nabi Muhammad SAW di Masjid Al-Huda",
  },
  en: {
    category: "Mawlid Commemoration",
    title: "Commemoration of Prophet Muhammad's Mawlid at Al-Huda Mosque",
    date: "August 23, 2026",
    lead: "The congregation of Al-Huda Mosque and the surrounding community commemorated the Mawlid as a meaningful occasion to deepen their love for Prophet Muhammad and emulate his noble character.",
    heading: "Emulating the Prophet's Noble Character",
    body: "The gathering was held on August 23, 2026, at Al-Huda Mosque, Mangga Bolong RT 07, Srengseng Sawah, Jagakarsa, South Jakarta 12640. The congregation participated in the commemoration in a solemn atmosphere of togetherness.",
    closing: "The event is expected to strengthen faith and fellowship and inspire the congregation to embody the Prophet's exemplary character in everyday life.",
    galleryTitle: "Event Gallery",
    galleryCaption: "The Mawlid commemoration at Al-Huda Mosque",
  },
  ar: {
    category: "ذكرى المولد النبوي",
    title: "إحياء ذكرى مولد النبي محمد ﷺ في مسجد الهدى",
    date: "23 أغسطس 2026",
    lead: "أحيا مصلو مسجد الهدى وأهالي المنطقة ذكرى المولد النبوي الشريف لتعميق محبتهم لرسول الله ﷺ والاقتداء بأخلاقه الكريمة.",
    heading: "الاقتداء بأخلاق الرسول الكريم",
    body: "أقيمت المناسبة يوم 23 أغسطس 2026 في مسجد الهدى، مانغا بولونغ، الحي 07، سرينغسينغ ساواه، جاغاكارسا، جنوب جاكرتا 12640، وسط أجواء إيمانية وروح من الأخوة والتعاون.",
    closing: "نسأل الله أن تكون هذه الذكرى سبباً في تقوية الإيمان وصلة الرحم، وحافزاً للاقتداء بسيرة النبي محمد ﷺ في الحياة اليومية.",
    galleryTitle: "توثيق الفعالية",
    galleryCaption: "أجواء إحياء ذكرى المولد النبوي في مسجد الهدى",
  },
};

export default function MaulidNabiPage() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const navT = translations[lang].nav;

  return (
    <div className="article-page">
      <SiteHeader />
      <main className="inner-main">
        <section className="article-hero">
          <img src="/maulid-nabi-masjid-al-huda-2026.jpeg" alt={t.title} />
          <div className="article-hero-overlay" />
          <div className="container article-hero-copy"><span>{t.category}</span><h1>{t.title}</h1><div className="article-meta"><i className="bi bi-calendar3" aria-hidden="true" /> {t.date} <span>•</span> <i className="bi bi-person" aria-hidden="true" /> YBUQ</div></div>
        </section>
        <article className="article-content"><div className="container article-container">
          <nav className="article-breadcrumb" aria-label="Breadcrumb"><a href="/">{navT.beranda}</a><span>/</span><a href="/aktivitas">{navT.aktivitas}</a><span>/</span><strong>{t.category}</strong></nav>
          <p className="article-lead">{t.lead}</p>
          <section className="article-section" aria-labelledby="maulid-heading"><div className="article-section-heading"><span><i className="bi bi-stars" aria-hidden="true" /></span><div><p>{t.category}</p><h2 id="maulid-heading">{t.heading}</h2></div></div><p>{t.body}</p><p>{t.closing}</p></section>
          <section className="article-photo-gallery" aria-labelledby="maulid-gallery-title">
            <div className="article-gallery-heading"><span><i className="bi bi-images" aria-hidden="true" /></span><h2 id="maulid-gallery-title">{t.galleryTitle}</h2></div>
            <div className="article-gallery-grid">
              {[1, 2, 3].map((number) => (
                <figure key={number}>
                  <a href={`/maulid-al-huda-gallery-${number}.jpeg`} target="_blank" rel="noreferrer" aria-label={`${t.galleryCaption} ${number}`}>
                    <img src={`/maulid-al-huda-gallery-${number}.jpeg`} alt={`${t.galleryCaption} ${number}`} loading="lazy" />
                  </a>
                  <figcaption>{t.galleryCaption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div></article>
      </main>
      <SiteFooter />
    </div>
  );
}
