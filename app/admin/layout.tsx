"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function checkAuth() {
      if (isLoginPage) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner" />
        <p>Memuat Panel Admin YBUQ...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: "bi-speedometer2" },
    { label: "Berita & Aktivitas", href: "/admin/aktivitas", icon: "bi-newspaper" },
    { label: "Hero Banner & Video", href: "/admin/hero", icon: "bi-film" },
    { label: "Pesan Masuk", href: "/admin/pesan", icon: "bi-inbox-fill" },
    { label: "Pengaturan Situs", href: "/admin/pengaturan", icon: "bi-gear-fill" },
  ];

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src="/logo-ybuq-2026.png" alt="Logo YBUQ" className="brand-logo" />
          <div className="brand-text">
            <strong>Webadmin YBUQ</strong>
            <small>CMS Portal</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a key={item.href} href={item.href} className={`nav-link ${isActive ? "active" : ""}`}>
                <i className={`bi ${item.icon}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <a href="/" target="_blank" rel="noreferrer" className="btn-view-site">
            <i className="bi bi-box-arrow-up-right" />
            <span>Lihat Website</span>
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <span className="page-title">
              {navItems.find((item) => item.href === pathname)?.label || "Webadmin"}
            </span>
          </div>

          <div className="topbar-right">
            <div className="admin-user-info">
              <i className="bi bi-person-circle" />
              <span>Admin YBUQ</span>
            </div>
            <button onClick={handleLogout} className="btn-logout" title="Keluar / Logout">
              <i className="bi bi-box-arrow-right" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
