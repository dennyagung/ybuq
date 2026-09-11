"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = translations[lang]?.nav ?? translations.id.nav;

  const navigation: [string, string][] = [
    [t.beranda, "/"],
    [t.tentangKami, "/tentang"],
    [t.pesantren, "/pesantren"],
    [t.masjidBuq24, "/masjid-buq-24"],
    [t.aktivitas, "/aktivitas"],
    [t.hubungiKami, "/hubungi-kami"],
  ];

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

  return (
    <header className="fixed-top site-header">
      <div className="header-topbar">
        <div className="container d-flex align-items-center justify-content-between gap-3">
          <div className="topbar-group">
            <a href="mailto:info@ybuq.or.id"><i className="fa-regular fa-envelope" aria-hidden="true" /> info@ybuq.or.id</a>
            <span className="d-none d-sm-flex topbar-phones"><i className="fa-solid fa-phone" aria-hidden="true" /><a href="tel:+628158949619">0815 8949 619</a><b>/</b><a href="tel:+628567558840">0856 7558 840</a></span>
          </div>
          <div className="topbar-group topbar-right">
            <span className="address d-none d-xl-flex"><i className="fa-solid fa-location-dot" aria-hidden="true" /> {t.addressTop}</span>
            <button
              type="button"
              className={`lang-btn ${lang === "id" ? "active" : ""}`}
              onClick={() => setLang("id")}
              aria-label="Bahasa Indonesia"
              style={{ background: "transparent", border: 0, color: lang === "id" ? "#d7ff45" : "#fff", fontWeight: lang === "id" ? 700 : 400, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <span className="flag flag-id" aria-hidden="true" /> ID
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
              aria-label="English"
              style={{ background: "transparent", border: 0, color: lang === "en" ? "#d7ff45" : "#fff", fontWeight: lang === "en" ? 700 : 400, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <span className="flag flag-gb" aria-hidden="true" /> EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === "ar" ? "active" : ""}`}
              onClick={() => setLang("ar")}
              aria-label="Bahasa Arab"
              style={{ background: "transparent", border: 0, color: lang === "ar" ? "#d7ff45" : "#fff", fontWeight: lang === "ar" ? 700 : 400, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <span className="flag flag-sa" aria-hidden="true">AR</span> AR
            </button>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand" aria-label="Navigasi utama">
        <div className="container">
          <a className="navbar-brand" href="/" aria-label="Yayasan Bina Ummah Qur'aniyah - Beranda">
            <img className="brand-logo" src="/logo-ybuq-2026.png" alt="Logo Yayasan Bina Ummah Qur'aniyah" />
            <span className="brand-copy"><strong>Yayasan Bina Ummah Qur&apos;aniyah</strong><small>{t.tagline}</small></span>
          </a>
          <div className="navbar-nav ms-auto align-items-center desktop-navigation">
            {navigation.map(([label, href]) => <a className="nav-link" href={href} key={href}>{label}</a>)}
          </div>
          <button className={`mobile-menu-toggle${menuOpen ? " active" : ""}`} type="button" aria-label={menuOpen ? t.menuClose : t.menuOpen} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
        </div>
      </nav>
      <div className={`mobile-menu-backdrop${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <nav id="mobile-navigation" className={`mobile-navigation${menuOpen ? " open" : ""}`} aria-label="Navigasi mobile" aria-hidden={!menuOpen}>
        {navigation.map(([label, href], index) => <a href={href} key={href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}><span>{String(index + 1).padStart(2, "0")}</span>{label}<i className="bi bi-arrow-up-right" aria-hidden="true" /></a>)}
      </nav>
    </header>
  );
}


