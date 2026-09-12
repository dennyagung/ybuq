"use client";

import { useEffect, useState } from "react";
import { Article, ContactMessage, getClientArticles, getClientMessages } from "../lib/cms-store";

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/content");
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setArticles(data.data.articles || []);
            setMessages(data.data.messages || []);
            setLoading(false);
            return;
          }
        }
      } catch {
        // API not available
      }
      setArticles(getClientArticles());
      setMessages(getClientMessages());
      setLoading(false);
    }
    fetchData();
  }, []);

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return <div className="admin-loading-inline">Memuat statistik dashboard...</div>;
  }

  return (
    <div className="dashboard-overview">
      <div className="admin-welcome-banner">
        <h2>Selamat Datang di Webadmin YBUQ! 👋</h2>
        <p>Kelola konten berita, video hero, pesan masuk pengunjung, dan informasi yayasan dengan mudah.</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-primary">
            <i className="bi bi-newspaper" />
          </div>
          <div className="stat-details">
            <span className="stat-number">{articles.length}</span>
            <span className="stat-label">Total Berita & Aktivitas</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-warning">
            <i className="bi bi-inbox-fill" />
          </div>
          <div className="stat-details">
            <span className="stat-number">{unreadMessagesCount}</span>
            <span className="stat-label">Pesan Belum Dibaca</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-success">
            <i className="bi bi-film" />
          </div>
          <div className="stat-details">
            <span className="stat-number">Hero Video</span>
            <span className="stat-label">Bahasa Inggris (EN) Aktif</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-info">
            <i className="bi bi-translate" />
          </div>
          <div className="stat-details">
            <span className="stat-number">3 Bahasa</span>
            <span className="stat-label">ID, EN, AR Aktif</span>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Content */}
      <div className="dashboard-grid">
        {/* Recent Articles */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3><i className="bi bi-newspaper" /> Berita & Aktivitas Terbaru</h3>
            <a href="/admin/aktivitas" className="btn-link">Kelola Semua →</a>
          </div>
          <div className="panel-body">
            <div className="recent-list">
              {articles.slice(0, 4).map((art) => (
                <div key={art.id} className="recent-item">
                  <div className="recent-item-title">
                    <strong>{art.title}</strong>
                    <small>{art.category} • {art.date}</small>
                  </div>
                  <a href="/admin/aktivitas" className="btn-icon" title="Edit">
                    <i className="bi bi-pencil-square" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3><i className="bi bi-lightning-charge-fill" /> Akses Cepat</h3>
          </div>
          <div className="panel-body">
            <div className="shortcuts-grid">
              <a href="/admin/aktivitas" className="shortcut-btn">
                <i className="bi bi-plus-circle-fill text-success" />
                <span>Tambah Berita Baru</span>
              </a>
              <a href="/admin/hero" className="shortcut-btn">
                <i className="bi bi-camera-reels-fill text-primary" />
                <span>Ganti Video Hero EN</span>
              </a>
              <a href="/admin/pesan" className="shortcut-btn">
                <i className="bi bi-envelope-open-fill text-warning" />
                <span>Cek Pesan Masuk</span>
              </a>
              <a href="/admin/pengaturan" className="shortcut-btn">
                <i className="bi bi-telephone-fill text-info" />
                <span>Update No. WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
