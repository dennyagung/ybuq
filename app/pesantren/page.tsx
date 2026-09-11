"use client";

import SiteFooter from "../SiteFooter";
import SiteHeader from "../SiteHeader";
import { useLanguage } from "../LanguageContext";
import { translations } from "../translations";

const valueColors = ["blue", "peach", "yellow", "green", "blue", "orange", "yellow", "green"];
const programTones = ["peach", "yellow", "blue", "green"];
const evalTones = ["blue", "yellow", "green"];

export default function PesantrenPage() {
  const { lang } = useLanguage();
  const t = translations[lang].pesantrenPage;

  const pesantrenValues = t.values.map((title, index) => ({
    title,
    color: valueColors[index] ?? "blue",
  }));

  const educationPrograms = t.schedules.map((schedule, index) => ({
    label: schedule.label,
    tone: programTones[index] ?? "blue",
    items: schedule.items,
  }));

  const evaluations = t.evaluations.map((evaluation, index) => ({
    label: evaluation.label,
    tone: evalTones[index] ?? "blue",
    items: evaluation.items,
  }));

  return (
    <div className="pesantren-page">
      <SiteHeader />
      <main className="pesantren-main">
        <section className="about-hero compact-about-hero">
          <img src="/hero-campus-wide.jpeg" alt="Kawasan pendidikan Yayasan Bina Ummah Qur'aniyah" />
          <div className="about-hero-overlay" />
          <div className="container about-hero-copy">
            <p>{t.heroKicker}</p>
            <h1>{t.heroTitle}</h1>
            <div className="about-breadcrumb"><a href="/">Beranda</a><span>/</span><strong>{t.breadcrumbCurrent}</strong></div>
          </div>
        </section>

        <section className="pesantren-core-values" aria-labelledby="pesantren-values-title">
          <div className="container">
            <h2 id="pesantren-values-title">{t.valuesTitle}</h2>
            <div className="core-values-grid">
              {pesantrenValues.map((value, index) => (
                <article className={`core-value-card core-value-${index + 1} ${value.color}`} key={value.title}>
                  <h3>{value.title}</h3>
                </article>
              ))}
              <div className="core-values-center" aria-hidden="true"><span><i className="bi bi-book-half" /></span></div>
            </div>
          </div>
        </section>

        <section className="education-program" aria-labelledby="education-program-title">
          <div className="container">
            <div className="education-program-heading">
              <div><p>{t.programKicker}</p><h2 id="education-program-title">{t.programTitle}</h2></div>
              <span>{t.programSub}</span>
            </div>
            <div className="education-flow">
              <div className="education-schedule">
                {educationPrograms.map((program, index) => (
                  <article className={`education-card ${program.tone}`} key={program.label} style={{ animationDelay: `${index * 90}ms` }}>
                    <h3><i className="bi bi-calendar-check" aria-hidden="true" />{program.label}</h3>
                    <ul>{program.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                ))}
              </div>
              <div className="evaluation-axis" aria-hidden="true"><span>{t.evaluationAxis}</span><i className="bi bi-arrow-right" /></div>
              <div className="education-evaluation">
                {evaluations.map((evaluation, index) => (
                  <article className={`education-card evaluation-card ${evaluation.tone}`} key={evaluation.label} style={{ animationDelay: `${360 + index * 90}ms` }}>
                    <h3><i className="bi bi-clipboard2-check" aria-hidden="true" />{evaluation.label}</h3>
                    <ul>{evaluation.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
