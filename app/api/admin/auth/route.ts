import { NextResponse } from "next/server";
import { pbkdf2Sync, timingSafeEqual } from "node:crypto";

const ADMIN_USER = "admin@ybuq.or.id";
const PASSWORD_SALT = process.env.YBUQ_ADMIN_PASSWORD_SALT || "47fb237fb7320d67b559c7b8b21f7966";
const PASSWORD_HASH = process.env.YBUQ_ADMIN_PASSWORD_HASH || "45c2213bfff967c957d22bc82eaf56c8e1e1e812aae5bed7a1a9419af6c4e2cb";
const SESSION_TOKEN = process.env.YBUQ_ADMIN_SESSION_TOKEN || "ybuq-admin-session-v2";

function isValidPassword(password: string) {
  const actual = pbkdf2Sync(password, PASSWORD_SALT, 210000, 32, "sha256");
  const expected = Buffer.from(PASSWORD_HASH, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, username, password } = body;

    if (action === "login") {
      if ((username === ADMIN_USER || username === "admin") && isValidPassword(password)) {
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
