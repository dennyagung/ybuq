import { NextResponse } from "next/server";

const ADMIN_USER = "admin@ybuq.or.id";
const ADMIN_PASS = "YBUQ@2026!Admin";
const SESSION_TOKEN = "ybuq-admin-authenticated-session-token-2026";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, username, password } = body;

    if (action === "login") {
      if ((username === ADMIN_USER || username === "admin") && password === ADMIN_PASS) {
        const response = NextResponse.json({ success: true, message: "Login berhasil" });
        response.cookies.set("ybuq_admin_session", SESSION_TOKEN, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24, // 24 hours
        });
        return response;
      }
      return NextResponse.json({ success: false, message: "Username atau password salah" }, { status: 401 });
    }

    if (action === "logout") {
      const response = NextResponse.json({ success: true, message: "Logout berhasil" });
      response.cookies.delete("ybuq_admin_session");
      return response;
    }

    return NextResponse.json({ success: false, message: "Aksi tidak dikenal" }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: "Gagal memproses permintaan" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const isAuthenticated = cookieHeader.includes(`ybuq_admin_session=${SESSION_TOKEN}`);

  return NextResponse.json({
    authenticated: isAuthenticated,
    user: isAuthenticated ? { name: "Administrator YBUQ", email: ADMIN_USER } : null,
  });
}
