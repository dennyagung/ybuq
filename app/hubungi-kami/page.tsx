"use client";

import { useState } from "react";
import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";

export default function HubungiKamiPage() {
  const { lang } = useLanguage();
  const t = translations[lang].contactPage;
  const navT = translations[lang].nav;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "message",
          action: "create",
          data: { name, email, phone: "-", subject, message },
        }),
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      alert("Terjadi kesalahan saat mengirim pesan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <SiteHeader />
      <main className="inner-main">
        <section className="about-hero compact-about-hero">
          <img src="/hero-campus-wide.jpeg" alt="Kawasan pendidikan Yayasan Bina Ummah Qur'aniyah" />
          <div className="about-hero-overlay" />
          <div className="container about-hero-copy">
            <p>{t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <div className="about-breadcrumb"><a href="/">{navT.beranda}</a><span>/</span><strong>{t.breadcrumbCurrent}</strong></div>
          </div>
        </section>
        <section className="contact-content">
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-5">
                <p className="inner-label">{t.label}</p>
                <h2>{t.heading}</h2>
                <div className="contact-list">
                  <a href="mailto:info@ybuq.or.id">
                    <i className="fa-regular fa-envelope" aria-hidden="true" />
                    <span><small>{t.emailLabel}</small><strong>info@ybuq.or.id</strong></span>
                  </a>
                  <a href="tel:+628158949619">
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                    <span><small>{t.phoneLabel}</small><strong>0815 8949 619 / 0856 7558 840</strong></span>
                  </a>
                  <div>
                    <i className="fa-solid fa-location-dot" aria-hidden="true" />
                    <span><small>{t.addressLabel}</small><strong>Jl. Lapangan Merah 1 No. 99, RT 011/RW 007, Kel. Srengseng Sawah, Kec. Jagakarsa, Jakarta Selatan 12640</strong></span>
                  </div>
                  <div>
                    <i className="fa-solid fa-clock" aria-hidden="true" />
                    <span><small>{t.hoursLabel}</small><strong>{t.hoursText}</strong></span>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form-heading">
                    <span>{t.formKicker}</span>
                    <h2>{t.formTitle}</h2>
                  </div>

                  {submitted && (
                    <div className="admin-alert admin-alert-info">
                      Terima kasih! Pesan Anda telah berhasil terkirim ke sekretariat yayasan. Kami akan segera menghubungi Anda.
                    </div>
                  )}

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name">{t.nameLabel}</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email">{t.emailInputLabel}</label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="subject">{t.subjectLabel}</label>
                      <input
                        id="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={t.subjectPlaceholder}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="message">{t.msgLabel}</label>
                      <textarea
                        id="message"
                        rows={6}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t.msgPlaceholder}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" disabled={loading}>
                        {loading ? "Mengirim..." : t.submitBtn} <i className="bi bi-send-fill" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="contact-map">
              <iframe title="Lokasi Yayasan Bina Ummah Qur'aniyah" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Jl.%20Lapangan%20Merah%201%20No.%2099%2C%20Srengseng%20Sawah%2C%20Jagakarsa%2C%20Jakarta%20Selatan%2012640&z=16&output=embed" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
