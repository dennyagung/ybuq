"use client";

import { useEffect, useState } from "react";
import { HeroConfig } from "../../lib/cms-store";

export default function AdminHeroPage() {
  const [hero, setHero] = useState<Partial<HeroConfig>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    async function loadHero() {
      try {
        const res = await fetch("/api/admin/content?type=hero");
        const data = await res.json();
        if (data.success) {
          setHero(data.data || {});
        }
      } catch {
        console.error("Gagal memuat hero config");
      } finally {
        setLoading(false);
      }
    }
    loadHero();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "hero", data: hero }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification("Pengaturan Hero Banner & Video berhasil diperbarui!");
      }
    } catch {
      alert("Gagal memperbarui hero config.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading-inline">Memuat pengaturan Hero Banner...</div>;

  return (
    <div className="admin-page-container">
      <div className="page-header-row">
        <div>
          <h2>Kelola Hero Banner & Video</h2>
          <p>Pengaturan media video latar belakang hero (Bahasa Inggris) dan teks sambutan yayasan</p>
        </div>
      </div>

      {notification && <div className="admin-alert admin-alert-info">{notification}</div>}

      <form onSubmit={handleSave} className="admin-card form-section">
        <h3><i className="bi bi-film text-primary" /> Pengaturan Video Hero Bahasa Inggris (EN)</h3>
        <p className="section-desc">Video ini diputar otomatis tanpa batasan height ketika pengunjung memilih Bahasa Inggris (EN).</p>
        
        <div className="form-group">
          <label>File Video Path (di folder public/)</label>
          <div className="input-group">
            <input
              type="text"
              value={hero.englishVideo || ""}
              onChange={(e) => setHero({ ...hero, englishVideo: e.target.value })}
              placeholder="/hero-video.mp4"
              required
            />
          </div>
          <small className="help-text">File video utama tersimpan di `public/hero-video.mp4`</small>
        </div>

        <hr className="divider" />

        <h3><i className="bi bi-translate text-success" /> Teks Box Sambutan Yayasan (Di bawah Video/Hero)</h3>
        
        <div className="form-group">
          <label>Judul Sambutan Bahasa Indonesia (ID)</label>
          <input
            type="text"
            value={hero.welcomeTitleId || ""}
            onChange={(e) => setHero({ ...hero, welcomeTitleId: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Deskripsi Sambutan Bahasa Indonesia (ID)</label>
          <textarea
            rows={3}
            value={hero.welcomeDescId || ""}
            onChange={(e) => setHero({ ...hero, welcomeDescId: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Judul Sambutan Bahasa Inggris (EN)</label>
          <input
            type="text"
            value={hero.welcomeTitleEn || ""}
            onChange={(e) => setHero({ ...hero, welcomeTitleEn: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Deskripsi Sambutan Bahasa Inggris (EN)</label>
          <textarea
            rows={3}
            value={hero.welcomeDescEn || ""}
            onChange={(e) => setHero({ ...hero, welcomeDescEn: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Judul Sambutan Bahasa Arab (AR)</label>
          <input
            type="text"
            value={hero.welcomeTitleAr || ""}
            onChange={(e) => setHero({ ...hero, welcomeTitleAr: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Deskripsi Sambutan Bahasa Arab (AR)</label>
          <textarea
            rows={3}
            value={hero.welcomeDescAr || ""}
            onChange={(e) => setHero({ ...hero, welcomeDescAr: e.target.value })}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <i className="bi bi-check-circle-fill" /> {saving ? "Menyimpan Perubahan..." : "Simpan Pengaturan Hero"}
          </button>
        </div>
      </form>
    </div>
  );
}
