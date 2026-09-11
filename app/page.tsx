"use client";

import HeroCarousel from "./HeroCarousel";
import DevelopmentGallery from "./DevelopmentGallery";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export default function Home() {
  const { lang } = useLanguage();
  const heroT = translations[lang].hero;
  const homeT = translations[lang].home;
  const navT = translations[lang].nav;
  const activitiesData = translations[lang].homeActivities;
  const videoLabel = { id: "Tonton Video", en: "Watch Video", ar: "شاهد الفيديو" }[lang];

  const activityAssets = [
    { image: "/maulid-nabi-masjid-al-huda-2026.jpeg", href: "/aktivitas/maulid-nabi-muhammad-masjid-al-huda" },
    { image: "/majelis-taklim-kuliah-subuh-subulussalam-2026.png", href: "/aktivitas/majelis-taklim-kuliah-subuh-subulussalam" },
    { image: "/aktivitas-adab-imam-khatib.png", href: "/aktivitas/adab-imam-dan-khatib" },
  ];

  const homeActivities = activitiesData.map((activity, index) => ({
    ...activity,
    image: activityAssets[index].image,
    href: activityAssets[index].href,
  }));

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <HeroCarousel />
        <section className="welcome-panel-wrap" aria-labelledby="welcome-title">
          <div className="welcome-panel">
            <h2 id="welcome-title">{heroT.welcomeTitle}</h2>
            <p>{heroT.welcomeDesc}</p>
          </div>
        </section>
        <section className="home-introduction" aria-labelledby="introduction-title">
          <div className="container">
            <div className="introduction-heading">
              <div><span>{homeT.introKicker}</span><h2 id="introduction-title">{homeT.introTitle}</h2></div>
            </div>
            <div className="row g-5 align-items-start">
              <div className="col-lg-8 introduction-copy">
                <p>{homeT.introP1}</p>
                <p>{homeT.introP2}</p>
                <p>{homeT.introP3}</p>
                <p className="introduction-prayer">{homeT.introPrayer}</p>
                <a className="introduction-video-button" href="/video-ybuq-20260828.mp4" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-play-circle-fill" aria-hidden="true" /> {videoLabel}
                </a>
              </div>
              <aside className="col-lg-4">
                <div className="introduction-signature">
                  <div className="signature-mark"><img src="/logo-ybuq-2026.png" alt="" /><span className="signature-quote-mark" aria-hidden="true">&quot;</span></div>
                  <blockquote>{homeT.quoteText}</blockquote>
                  <div className="signature-divider" />
                  <strong>{homeT.caretakerName}</strong>
                  <span>{homeT.caretakerRole}</span>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <section className="development-showcase" aria-labelledby="development-title">
          <div className="container">
            <div className="development-intro">
              <div className="development-title-block">
                <span>{homeT.devKicker}</span>
                <h2 id="development-title">{homeT.devTitle.split(" ")[0]}<br />{homeT.devTitle.split(" ")[1] ?? ""}</h2>
                <a href="/pesantren"><i className="bi bi-arrow-up-right" aria-hidden="true" /> {homeT.devBtn}</a>
              </div>
              <div className="development-copy">
                <h3>{homeT.devSubHeading}</h3>
                <p>{homeT.devDesc}</p>
              </div>
            </div>
            <DevelopmentGallery />
          </div>
        </section>
        <section className="home-activities" aria-labelledby="home-activities-title">
          <div className="container">
            <div className="home-activities-heading">
              <div><h2 id="home-activities-title">{homeT.activitiesTitle}</h2><p>{homeT.activitiesSub}</p></div>
              <a href="/aktivitas"><i className="bi bi-arrow-up-right" aria-hidden="true" /> {homeT.activitiesAllBtn}</a>
            </div>
            <div className="row g-4">{homeActivities.map((activity) => <div className="col-md-6 col-xl-4" key={activity.title}><article className="home-activity-card"><a className="home-activity-image" href={activity.href}><img src={activity.image} alt={activity.title} /><span>{activity.category}</span></a><div className="home-activity-body"><h3>{activity.title}</h3><p>{activity.text}</p><a href={activity.href}>{homeT.activitiesReadMore} <i className="bi bi-arrow-right" aria-hidden="true" /></a></div></article></div>)}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

