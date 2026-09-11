"use client";

import { useEffect, useState } from "react";
import { ContactMessage } from "../../lib/cms-store";

export default function AdminPesanPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  const loadMessages = async () => {
    try {
      const res = await fetch("/api/admin/content?type=messages");
      const data = await res.json();
      if (data.success) {
        setMessages(data.data || []);
      }
    } catch {
      console.error("Gagal memuat pesan masuk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSelectMessage = async (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (!msg.read) {
      try {
        await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "message", action: "markRead", data: { id: msg.id } }),
        });
        loadMessages();
      } catch {
        console.error("Gagal tandai terbaca");
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Hapus pesan ini dari inbox?")) return;
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "message", action: "delete", data: { id } }),
      });
      setSelectedMsg(null);
      loadMessages();
    } catch {
      alert("Gagal menghapus pesan.");
    }
  };

  if (loading) return <div className="admin-loading-inline">Memuat kotak masuk pesan...</div>;

  return (
    <div className="admin-page-container">
      <div className="page-header-row">
        <div>
          <h2>Pesan Masuk (Inbox Hubungi Kami)</h2>
          <p>Daftar pesan dan pertanyaan dari pengunjung situs website ybuq.or.id</p>
        </div>
      </div>

      <div className="inbox-layout">
        {/* Messages List Sidebar */}
        <div className="inbox-list-card admin-card">
          <h3><i className="bi bi-inbox-fill text-warning" /> Daftar Pesan ({messages.length})</h3>
          <div className="inbox-items">
            {messages.length === 0 ? (
              <p className="empty-text">Belum ada pesan masuk.</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`inbox-item ${!msg.read ? "unread" : ""} ${selectedMsg?.id === msg.id ? "active" : ""}`}
                >
                  <div className="inbox-item-header">
                    <strong>{msg.name}</strong>
                    <small>{msg.createdAt}</small>
                  </div>
                  <div className="inbox-subject">{msg.subject}</div>
                  <div className="inbox-snippet">{msg.message}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Content View */}
        <div className="inbox-detail-card admin-card">
          {selectedMsg ? (
            <div className="message-detail">
              <div className="msg-detail-header">
                <div>
                  <h3>{selectedMsg.subject}</h3>
                  <div className="sender-info">
                    <strong>{selectedMsg.name}</strong> &lt;{selectedMsg.email}&gt; • {selectedMsg.phone}
                  </div>
                  <div className="msg-date"><i className="bi bi-clock" /> {selectedMsg.createdAt}</div>
                </div>
                <button onClick={() => handleDeleteMessage(selectedMsg.id)} className="btn-action btn-delete" title="Hapus Pesan">
                  <i className="bi bi-trash-fill" /> Hapus
                </button>
              </div>
              <hr className="divider" />
              <div className="msg-body">
                <p>{selectedMsg.message}</p>
              </div>
              <div className="msg-reply-actions">
                <a href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`} className="admin-btn-primary">
                  <i className="bi bi-reply-fill" /> Balas via Email
                </a>
                <a href={`https://wa.me/${selectedMsg.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="admin-btn-success">
                  <i className="bi bi-whatsapp" /> Balas via WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="empty-detail-state">
              <i className="bi bi-envelope-open" />
              <p>Pilih salah satu pesan di sebelah kiri untuk membaca isinya.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
