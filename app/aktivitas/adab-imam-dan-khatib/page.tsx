"use client";

import SiteFooter from "../../SiteFooter";
import SiteHeader from "../../SiteHeader";
import { useLanguage } from "../../LanguageContext";
import { translations } from "../../translations";

export default function ArticlePage() {
  const { lang } = useLanguage();
  const t = translations[lang].articleDetail;
  const navT = translations[lang].nav;

  return (
    <div className="article-page">
      <SiteHeader />
      <main className="inner-main">
        <section className="article-hero">
          <img src="/aktivitas-adab-imam-khatib.png" alt="Ilustrasi khutbah dan imam" />
          <div className="article-hero-overlay" />
          <div className="container article-hero-copy">
            <span>{t.category}</span>
            <h1>{t.title}</h1>
            <div className="article-meta"><i className="bi bi-calendar3" aria-hidden="true" /> {t.date} <span>•</span> <i className="bi bi-person" aria-hidden="true" /> {t.author}</div>
          </div>
        </section>

        <article className="article-content">
          <div className="container article-container">
            <nav className="article-breadcrumb" aria-label="Breadcrumb"><a href="/">{navT.beranda}</a><span>/</span><a href="/aktivitas">{navT.aktivitas}</a><span>/</span><strong>{t.breadcrumbCurrent}</strong></nav>
            <p className="article-lead">{t.lead}</p>

            <section className="article-section" aria-labelledby="adab-imam-title">
              <div className="article-section-heading"><span>A</span><div><p>{t.section1Kicker}</p><h2 id="adab-imam-title">{t.section1Title}</h2></div></div>
              <p>{t.section1Desc}</p>
              <ol className="article-points">{t.imamPoints.map((point) => <li key={point}>{point}</li>)}</ol>
            </section>

            <blockquote className="article-quote">{t.quote} <cite>{t.quoteCite}</cite></blockquote>

            <section className="article-section" aria-labelledby="adab-khatib-title">
              <div className="article-section-heading"><span>B</span><div><p>{t.section2Kicker}</p><h2 id="adab-khatib-title">{t.section2Title}</h2></div></div>
              <p>{t.section2Desc}</p>
              <ol className="article-points">{t.khatibPoints.map((point) => <li key={point}>{point}</li>)}</ol>
            </section>

            <div className="article-closing"><i className="bi bi-book" aria-hidden="true" /><div><h2>{t.closingTitle}</h2><p>{t.closingDesc}</p></div></div>
            <a className="article-back" href="/aktivitas"><i className="bi bi-arrow-left" aria-hidden="true" /> {t.backBtn}</a>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
