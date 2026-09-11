"use client";

import { useEffect, useState } from "react";
import { Article } from "../../lib/cms-store";

export default function AdminAktivitasPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Partial<Article>>({});
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

  const loadArticles = async () => {
    try {
      const res = await fetch("/api/admin/content?type=articles");
      const data = await res.json();
      if (data.success) {
        setArticles(data.data || []);
      }
    } catch {
      console.error("Gagal memuat artikel");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpenAdd = () => {
    setEditingArticle({ category: "Ibadah & Kajian", date: "", title: "", excerpt: "", content: "", image: "/hero-campus-wide.jpeg" });
    setShowModal(true);
  };

  const handleOpenEdit = (article: Article) => {
    setEditingArticle({ ...article });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel/aktivitas ini?")) return;

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "article", action: "delete", data: { id } }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification("Artikel berhasil dihapus.");
        loadArticles();
      }
    } catch {
      alert("Gagal menghapus artikel.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const action = editingArticle.id ? "update" : "create";
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "article", action, data: editingArticle }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification(`Artikel berhasil ${action === "create" ? "ditambahkan" : "diperbarui"}.`);
        setShowModal(false);
        loadArticles();
      }
    } catch {
      alert("Gagal menyimpan artikel.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading-inline">Memuat daftar aktivitas...</div>;

  return (
    <div className="admin-page-container">
      <div className="page-header-row">
        <div>
          <h2>Kelola Berita & Aktivitas Yayasan</h2>
          <p>Tambah, edit, atau hapus kegiatan dan artikel berita di website ybuq.or.id</p>
        </div>
        <button onClick={handleOpenAdd} className="admin-btn-success">
          <i className="bi bi-plus-lg" /> Tambah Aktivitas Baru
        </button>
      </div>

      {notification && <div className="admin-alert admin-alert-info">{notification}</div>}

      {/* Table List */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Foto Cover</th>
                <th>Judul Aktivitas</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((art) => (
                <tr key={art.id}>
                  <td>
                    <img src={art.image || "/hero-campus-wide.jpeg"} alt={art.title} className="thumb-img" />
                  </td>
                  <td>
                    <strong>{art.title}</strong>
                    <div className="table-excerpt">{art.excerpt}</div>
                  </td>
                  <td><span className="badge badge-category">{art.category}</span></td>
                  <td>{art.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button onClick={() => handleOpenEdit(art)} className="btn-action btn-edit" title="Edit">
                        <i className="bi bi-pencil-fill" />
                      </button>
                      <button onClick={() => handleDelete(art.id)} className="btn-action btn-delete" title="Hapus">
                        <i className="bi bi-trash-fill" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edit / Add */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header">
              <h3>{editingArticle.id ? "Edit Aktivitas" : "Tambah Aktivitas Baru"}</h3>
              <button onClick={() => setShowModal(false)} className="modal-close">×</button>
            </div>
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label>Judul Aktivitas / Artikel</label>
                <input
                  type="text"
                  value={editingArticle.title || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="Contoh: Majelis Taklim & Kuliah Subuh YBUQ"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kategori</label>
                  <select
                    value={editingArticle.category || "Ibadah & Kajian"}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  >
                    <option value="Ibadah & Kajian">Ibadah & Kajian</option>
                    <option value="Majelis Taklim">Majelis Taklim</option>
                    <option value="Peringatan Hari Besar">Peringatan Hari Besar</option>
                    <option value="Pendidikan & Tahfidz">Pendidikan & Tahfidz</option>
                    <option value="Pengabdian Masyarakat">Pengabdian Masyarakat</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Path Foto Cover (di folder public/)</label>
                  <input
                    type="text"
                    value={editingArticle.image || ""}
                    onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })}
                    placeholder="/aktivitas-adab-imam-khatib.png"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={3}
                  value={editingArticle.excerpt || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  placeholder="Ringkasan singkat aktivitas..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Isi Berita / Artikel Lengkap</label>
                <textarea
                  rows={6}
                  value={editingArticle.content || ""}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  placeholder="Isi rincian kegiatan..."
                />
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="admin-btn-secondary">
                  Batal
                </button>
                <button type="submit" className="admin-btn-primary" disabled={saving}>
                  {saving ? "Menyimpan..." : "Simpan Berita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
