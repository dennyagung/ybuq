import { NextResponse } from "next/server";
import {
  initialArticles,
  initialHeroConfig,
  initialMessages,
  initialSettings,
  Article,
  HeroConfig,
  ContactMessage,
  SiteSettings,
} from "../../../lib/cms-store";

// Global memory state for runtime persistence
let articles: Article[] = [...initialArticles];
let heroConfig: HeroConfig = { ...initialHeroConfig };
let messages: ContactMessage[] = [...initialMessages];
let settings: SiteSettings = { ...initialSettings };

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (type === "articles") {
    return NextResponse.json({ success: true, data: articles });
  }

  if (type === "hero") {
    return NextResponse.json({ success: true, data: heroConfig });
  }

  if (type === "messages") {
    return NextResponse.json({ success: true, data: messages });
  }

  if (type === "settings") {
    return NextResponse.json({ success: true, data: settings });
  }

  return NextResponse.json({
    success: true,
    data: { articles, heroConfig, messages, settings },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data, action } = body;

    // Handle Article Operations
    if (type === "article") {
      if (action === "create") {
        const newArticle: Article = {
          id: String(Date.now()),
          date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          ...data,
        };
        articles.unshift(newArticle);
        return NextResponse.json({ success: true, data: newArticle });
      }

      if (action === "update") {
        articles = articles.map((item) => (item.id === data.id ? { ...item, ...data } : item));
        return NextResponse.json({ success: true, data });
      }

      if (action === "delete") {
        articles = articles.filter((item) => item.id !== data.id);
        return NextResponse.json({ success: true });
      }
    }

    // Handle Hero Config Operations
    if (type === "hero") {
      heroConfig = { ...heroConfig, ...data };
      return NextResponse.json({ success: true, data: heroConfig });
    }

    // Handle Messages Operations
    if (type === "message") {
      if (action === "create") {
        const newMsg: ContactMessage = {
          id: `msg-${Date.now()}`,
          createdAt: new Date().toLocaleString("id-ID"),
          read: false,
          ...data,
        };
        messages.unshift(newMsg);
        return NextResponse.json({ success: true, data: newMsg });
      }

      if (action === "markRead") {
        messages = messages.map((m) => (m.id === data.id ? { ...m, read: true } : m));
        return NextResponse.json({ success: true });
      }

      if (action === "delete") {
        messages = messages.filter((m) => m.id !== data.id);
        return NextResponse.json({ success: true });
      }
    }

    // Handle Settings Operations
    if (type === "settings") {
      settings = { ...settings, ...data };
      return NextResponse.json({ success: true, data: settings });
    }

    return NextResponse.json({ success: false, message: "Tipe tidak valid" }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: "Gagal menyimpan data" }, { status: 500 });
  }
}
