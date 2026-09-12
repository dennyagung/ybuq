"use client";

import { useEffect, useState } from "react";
import { getClientSettings, saveClientSettings, SiteSettings } from "../../lib/cms-store";

export default function AdminPengaturanPage() {
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/content?type=settings");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setSettings(data.data || {});
            setLoading(false);
            return;
          }
        }
      } catch {
        // API not available
      }
      setSettings(getClientSettings());
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification("");

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "settings", data: settings }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setNotification("Pengaturan kontak dan informasi situs berhasil diperbarui!");
          setSaving(false);
          return;
        }
      }
    } catch {
      // API not available
    }

    // Client fallback
    const fullSettings = { ...getClientSettings(), ...settings } as SiteSettings;
    saveClientSettings(fullSettings);
    setSettings(fullSettings);
    setNotification("Pengaturan kontak dan informasi situs berhasil diperbarui!");
    setSaving(false);
  };

  if (loading) return <div className="admin-loading-inline">Memuat pengaturan situs...</div>;

  return (
    <div className="admin-page-container">
      <div className="page-header-row">
        <div>
          <h2>Pengaturan Situs & Informasi Kontak</h2>
          <p>Kelola alamat yayasan, nomor WhatsApp/Telepon, email resmi, dan media sosial</p>
        </div>
      </div>

      {notification && <div className="admin-alert admin-alert-info">{notification}</div>}

      <form onSubmit={handleSave} className="admin-card form-section">
        <h3><i className="bi bi-geo-alt-fill text-danger" /> Kontak Sekretariat YBUQ</h3>
        
        <div className="form-group">
          <label>Judul Sekretariat</label>
          <input
            type="text"
            value={settings.secretariatTitle || ""}
            onChange={(e) => setSettings({ ...settings, secretariatTitle: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Alamat Lengkap Yayasan</label>
          <textarea
            rows={3}
            value={settings.address || ""}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email Resmi Yayasan</label>
            <input
              type="email"
              value={settings.email || ""}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Jam Operasional</label>
            <input
              type="text"
              value={settings.operatingHours || ""}
              onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nomor Telepon / WhatsApp 1</label>
            <input
              type="text"
              value={settings.phone1 || ""}
              onChange={(e) => setSettings({ ...settings, phone1: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Nomor Telepon 2</label>
            <input
              type="text"
              value={settings.phone2 || ""}
              onChange={(e) => setSettings({ ...settings, phone2: e.target.value })}
              required
            />
          </div>
        </div>

        <hr className="divider" />

        <h3><i className="bi bi-share-fill text-info" /> Tautan Media Sosial</h3>

        <div className="form-group">
          <label>URL Akun Instagram</label>
          <input
            type="text"
            value={settings.instagramUrl || ""}
            onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>URL Channel YouTube</label>
          <input
            type="text"
            value={settings.youtubeUrl || ""}
            onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="admin-btn-primary" disabled={saving}>
            <i className="bi bi-check-circle-fill" /> {saving ? "Menyimpan..." : "Simpan Pengaturan Kontak"}
          </button>
        </div>
      </form>
    </div>
  );
}
