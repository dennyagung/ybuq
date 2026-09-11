"use client";

import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";

const functionIcons = ["bi-moon-stars-fill", "bi-book-half", "bi-people-fill"];
const mosqueGallerySources = [
  "/masjid-3d-front.png",
  "/masjid-3d-left.png",
  "/masjid-3d-right.png",
  "/masjid-3d-aerial-a.png",
  "/masjid-3d-aerial-b.png",
  "/masjid-buq-24.jpg",
  "/masjid-3d-complex.jpg",
  "/masjid-3d-courtyard.jpg",
];

export default function MasjidBuq24Page() {
  const { lang } = useLanguage();
  const t = translations[lang].masjidPage;
  const navT = translations[lang].nav;

  const functions = t.functions.map((fn, index) => ({
    icon: functionIcons[index] ?? "bi-star",
    title: fn.title,
    text: fn.text,
  }));

  const mosqueGallery = t.mosqueGallery.map((g, index) => ({
    src: mosqueGallerySources[index] ?? "/masjid-buq-24.jpg",
    title: g.title,
  }));

  return (
    <div className="mosque-page">
      <SiteHeader />
      <main className="mosque-main">
        <section className="mosque-hero">
          <img src="/masjid-buq-24.jpg" alt="Rancangan Masjid BUQ-24" />
          <div className="mosque-hero-overlay" />
          <div className="container mosque-hero-copy">
            <p>{t.heroKicker}</p>
            <h1>Masjid<br /><span>BUQ-24</span></h1>
            <div className="mosque-breadcrumb"><a href="/">{navT.beranda}</a><span>/</span><strong>{t.breadcrumbCurrent}</strong></div>
          </div>
          <div className="mosque-scroll-note"><i className="bi bi-arrow-down" aria-hidden="true" /> {t.scrollHint}</div>
        </section>

        <section className="mosque-intro">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5"><p className="mosque-label">{t.introLabel}</p><h2>{t.introTitle}</h2></div>
              <div className="col-lg-7"><p className="mosque-lead">{t.introLead}</p><p>{t.introSub}</p></div>
            </div>
          </div>
        </section>

        <section className="mosque-functions">
          <div className="container">
            <div className="mosque-functions-heading"><div><p className="mosque-label">{t.funcLabel}</p><h2>{t.funcTitle}</h2></div><span>{t.funcSub}</span></div>
            <div className="row g-4 mt-2">{functions.map((item, index) => <div className="col-md-4" key={item.title}><article className="mosque-function-card"><span>0{index + 1}</span><i className={`bi ${item.icon}`} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article></div>)}</div>
          </div>
        </section>

        <section className="mosque-visual" aria-labelledby="mosque-gallery-title">
          <div className="container">
            <div className="mosque-gallery-heading"><div><p className="mosque-label">{t.visualLabel}</p><h2 id="mosque-gallery-title">{t.visualTitle}</h2></div><span>{t.visualSub}</span></div>
            <div className="mosque-gallery-grid">{mosqueGallery.map((image, index) => <figure className={`mosque-gallery-card gallery-item-${index + 1}`} key={image.src}><img src={image.src} alt={`${image.title} Masjid BUQ-24`} loading={index > 1 ? "lazy" : undefined} /><figcaption><span>{String(index + 1).padStart(2, "0")}</span><strong>{image.title}</strong></figcaption></figure>)}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
