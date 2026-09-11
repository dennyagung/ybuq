"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { lang } = useLanguage();
  const heroT = translations[lang].hero;

  const slidesData = [
    {
      image: "/hero-campus-wide.jpeg",
      ...heroT.slides[0],
    },
    {
      image: "/hero-campus-close.jpeg",
      ...heroT.slides[1],
    },
  ];

  const hasHeroVideo = true;
  const isArabic = lang === "ar";

  useEffect(() => {
    if (hasHeroVideo) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slidesData.length), 6000);
    return () => window.clearInterval(timer);
  }, [slidesData.length, hasHeroVideo]);

  const move = (direction: number) => setActive((current) => (current + direction + slidesData.length) % slidesData.length);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && video.paused) await video.play();
  };

  // Every language uses its own full-width hero video.
  if (hasHeroVideo) {
    const videoSource = lang === "id" ? "/hero-video-id.mp4" : isArabic ? "/hero-video-ar.mp4" : "/hero-video.mp4";
    const soundOnLabel = isArabic ? "تشغيل الصوت" : lang === "en" ? "Enable Sound" : "Aktifkan Suara";
    const soundOffLabel = isArabic ? "كتم الصوت" : lang === "en" ? "Mute Sound" : "Matikan Suara";
    const soundOnAria = isArabic ? "تشغيل صوت الفيديو" : lang === "en" ? "Enable video sound" : "Aktifkan suara video";
    const soundOffAria = isArabic ? "كتم صوت الفيديو" : lang === "en" ? "Mute video sound" : "Matikan suara video";
    return (
      <section id="beranda" className={`home-hero has-video${isArabic ? " arabic-video" : ""}`} aria-label={isArabic ? "فيديو الصفحة الرئيسية" : "Hero Video"}>
        <div className="hero-slides">
          <article className="hero-slide active">
            <video
              ref={videoRef}
              src={videoSource}
              poster="/hero-campus-wide.jpeg"
              autoPlay
              loop
              muted
              playsInline
              aria-label={heroT.slides[0].title}
            />
            <button
              className={`hero-sound-toggle${isMuted ? "" : " sound-on"}`}
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? soundOnAria : soundOffAria}
              aria-pressed={!isMuted}
            >
              <i className={`bi ${isMuted ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`} aria-hidden="true" />
              <span>{isMuted ? soundOnLabel : soundOffLabel}</span>
            </button>
          </article>
        </div>
      </section>
    );
  }

  // Fallback carousel retained for future language or content variants.
  return (
    <section id="beranda" className="home-hero" aria-roledescription="carousel" aria-label="Galeri halaman depan">
      <div className="hero-slides">
        {slidesData.map((slide, index) => (
          <article className={`hero-slide${index === active ? " active" : ""}`} key={slide.image} aria-hidden={index !== active}>
            <img src={slide.image} alt={slide.title} />
          </article>
        ))}
      </div>
      <button className="carousel-arrow previous" type="button" onClick={() => move(-1)} aria-label="Slide sebelumnya">‹</button>
      <button className="carousel-arrow next" type="button" onClick={() => move(1)} aria-label="Slide berikutnya">›</button>
      <div className="carousel-dots" aria-label="Pilih slide">
        {slidesData.map((slide, index) => <button className={index === active ? "active" : ""} type="button" key={slide.image} onClick={() => setActive(index)} aria-label={`Tampilkan slide ${index + 1}`} aria-current={index === active ? "true" : undefined} />)}
      </div>
    </section>
  );
}
