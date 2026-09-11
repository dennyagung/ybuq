"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { translations } from "./translations";

const imageSources = [
  "/hero-campus-wide.jpeg",
  "/hero-campus-close.jpeg",
  "/masjid-buq-24.jpg",
  "/masjid-3d-front.png",
  "/masjid-3d-left.png",
  "/masjid-3d-right.png",
  "/masjid-3d-aerial-a.png",
];

export default function DevelopmentGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, scroll: 0 });
  const dragged = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const { lang } = useLanguage();
  const galleryItems = translations[lang].galleryItems;
  const homeT = translations[lang].home;

  const images = imageSources.map((src, index) => ({
    src,
    title: galleryItems[index]?.title ?? "",
    text: galleryItems[index]?.text ?? "",
  }));

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const goTo = (index: number) => {
    const normalized = (index + images.length) % images.length;
    const slide = trackRef.current?.children[normalized] as HTMLElement | undefined;
    if (slide) trackRef.current?.scrollTo({ left: slide.offsetLeft - (trackRef.current?.offsetLeft ?? 0), behavior: "smooth" });
    setCurrent(normalized);
  };

  useEffect(() => {
    if (paused || dragging || active !== null) return;
    const timer = window.setTimeout(() => goTo(current + 1), 4500);
    return () => window.clearTimeout(timer);
  }, [current, paused, dragging, active]);

  return <>
    <div className="development-slider-controls">
      <span>{homeT.devDragHint}</span>
      <div><button type="button" onClick={() => goTo(current - 1)} aria-label={homeT.devPrevImg}><i className="bi bi-arrow-left" /></button><button type="button" onClick={() => goTo(current + 1)} aria-label={homeT.devNextImg}><i className="bi bi-arrow-right" /></button></div>
    </div>
    <div className={`development-slider ${dragging ? "dragging" : ""}`} ref={trackRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onPointerDown={(event) => { if (!trackRef.current) return; dragStart.current = { x: event.clientX, scroll: trackRef.current.scrollLeft }; dragged.current = false; setDragging(true); trackRef.current.setPointerCapture(event.pointerId); }}
      onPointerMove={(event) => { if (!dragging || !trackRef.current) return; const distance = event.clientX - dragStart.current.x; if (Math.abs(distance) > 6) dragged.current = true; trackRef.current.scrollLeft = dragStart.current.scroll - distance; }}
      onPointerUp={(event) => { setDragging(false); trackRef.current?.releasePointerCapture(event.pointerId); }}
      onPointerCancel={() => setDragging(false)}
      onScroll={() => { if (!trackRef.current) return; const slides = Array.from(trackRef.current.children) as HTMLElement[]; const nearest = slides.reduce((best, slide, index) => Math.abs(slide.offsetLeft - trackRef.current!.scrollLeft) < Math.abs(slides[best].offsetLeft - trackRef.current!.scrollLeft) ? index : best, 0); setCurrent(nearest); }}>
      {images.map((image, index) => <button type="button" className="development-slide" key={image.src} onClick={() => { if (!dragged.current) setActive(index); }} aria-label={`Perbesar ${image.title}`}><img src={image.src} alt={image.title} draggable="false" /><span className="slide-overlay"><b>{String(index + 1).padStart(2, "0")}</b><span><strong>{image.title}</strong><small>{image.text}</small></span><i className="bi bi-arrows-fullscreen" aria-hidden="true" /></span></button>)}
    </div>
    <div className="development-bullets" aria-label="Pilih gambar">{images.map((image, index) => <button type="button" className={current === index ? "active" : ""} key={image.src} onClick={() => goTo(index)} aria-label={`Tampilkan gambar ${index + 1}`} aria-current={current === index ? "true" : undefined} />)}</div>
    {active !== null && <div className="development-lightbox" role="dialog" aria-modal="true" aria-label={images[active].title} onClick={() => setActive(null)}><button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label={homeT.devCloseLightbox}><i className="bi bi-x-lg" /></button><button className="lightbox-nav previous" type="button" onClick={(event) => { event.stopPropagation(); setActive((active - 1 + images.length) % images.length); }} aria-label={homeT.devPrevImg}><i className="bi bi-chevron-left" /></button><figure onClick={(event) => event.stopPropagation()}><img src={images[active].src} alt={images[active].title} /><figcaption><strong>{images[active].title}</strong><span>{images[active].text}</span></figcaption></figure><button className="lightbox-nav next" type="button" onClick={(event) => { event.stopPropagation(); setActive((active + 1) % images.length); }} aria-label={homeT.devNextImg}><i className="bi bi-chevron-right" /></button></div>}
  </>;
}
