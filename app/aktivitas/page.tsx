"use client";

import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";

export default function AktivitasPage() {
  const { lang } = useLanguage();
  const t = translations[lang].aktivitasPage;
  const navT = translations[lang].nav;

  const articleAssets = [
    { image: "/maulid-nabi-masjid-al-huda-2026.jpeg", href: "/aktivitas/maulid-nabi-muhammad-masjid-al-huda" },
    { image: "/majelis-taklim-kuliah-subuh-subulussalam-2026.png", href: "/aktivitas/majelis-taklim-kuliah-subuh-subulussalam" },
    { image: "/aktivitas-adab-imam-khatib.png", href: "/aktivitas/adab-imam-dan-khatib" },
  ];

  const articles = t.articles.map((art, index) => ({
    image: articleAssets[index]?.image ?? "/aktivitas-adab-imam-khatib.png",
    category: art.category,
    date: art.date,
    title: art.title,
    excerpt: art.excerpt,
    href: articleAssets[index]?.href ?? "/aktivitas",
  }));

  return (
    <div className="activity-page">
      <SiteHeader />
      <main className="inner-main">
        <section className="about-hero compact-about-hero">
          <img src="/hero-campus-close.jpeg" alt="Kawasan Pondok Pesantren Bina Ummah Qur'aniyah" />
          <div className="about-hero-overlay" />
          <div className="container about-hero-copy">
            <p>{t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <div className="about-breadcrumb"><a href="/">{navT.beranda}</a><span>/</span><strong>{t.breadcrumbCurrent}</strong></div>
          </div>
        </section>

        <section className="activity-news">
          <div className="container">
            <header className="activity-news-heading">
              <div><span>{t.newsKicker}</span><h2>{t.newsTitle}</h2></div>
              <p>{t.newsSub}</p>
            </header>

            <div className="row g-4">
              {articles.map((article) => (
                <div className="col-md-6 col-xl-4" key={article.title}>
                  <article className="activity-news-card">
                    <a className="activity-news-image" href={article.href} aria-label={`Baca ${article.title}`}>
                      <img src={article.image} alt={article.title} />
                      <span>{article.category}</span>
                    </a>
                    <div className="activity-news-body">
                      <div className="activity-news-date"><i className="bi bi-calendar3" aria-hidden="true" /> {article.date}</div>
                      <h3><a href={article.href}>{article.title}</a></h3>
                      <p>{article.excerpt}</p>
                      <a className="activity-read-more" href={article.href}>{t.readMore} <i className="bi bi-arrow-right" aria-hidden="true" /></a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}


