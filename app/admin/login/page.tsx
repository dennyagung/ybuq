"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Gagal login. Periksa username dan password Anda.");
      }
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src="/logo-ybuq-2026.png" alt="Logo YBUQ" className="admin-logo" />
          <h1>Webadmin YBUQ</h1>
          <p>Panel Administrasi Yayasan Bina Ummah Qur'aniyah</p>
        </div>

        {error && <div className="admin-alert admin-alert-danger">{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="username">Username / Email</label>
            <div className="admin-input-icon">
              <i className="bi bi-person-fill" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@ybuq.or.id"
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <div className="admin-input-icon">
              <i className="bi bi-lock-fill" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                className="btn-toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle Password Visibility"
              >
                <i className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`} />
              </button>
            </div>
          </div>

          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? "Memproses Login..." : "Masuk ke Panel Admin"}
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/" className="back-link">
            ← Kembali ke Website Utama
          </a>
        </div>
      </div>
    </div>
  );
}
