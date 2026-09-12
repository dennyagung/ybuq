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

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("ybuq_admin_session", "ybuq-admin-session-v2");
          router.push("/admin");
          return;
        } else {
          setError(data.message || "Gagal login. Periksa username dan password Anda.");
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fallback for static cPanel hosting where /api/admin/auth returns 404 / error
    }

    // Client-side authentication check for static export mode
    const cleanUser = username.trim().toLowerCase();
    if ((cleanUser === "admin" || cleanUser === "admin@ybuq.or.id") && password === "YBUQ@2026!Admin") {
      localStorage.setItem("ybuq_admin_session", "ybuq-admin-session-v2");
      document.cookie = "ybuq_admin_session=ybuq-admin-session-v2; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Username atau password salah. Silakan coba lagi.");
    }
    setLoading(false);
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
