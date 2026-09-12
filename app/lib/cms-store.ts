export interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  content?: string;
  image?: string;
}

export interface HeroConfig {
  englishVideo: string;
  welcomeTitleId: string;
  welcomeTitleEn: string;
  welcomeTitleAr: string;
  welcomeDescId: string;
  welcomeDescEn: string;
  welcomeDescAr: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SiteSettings {
  secretariatTitle: string;
  address: string;
  email: string;
  phone1: string;
  phone2: string;
  operatingHours: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export const initialArticles: Article[] = [
  {
    id: "1",
    category: "Ibadah & Kajian",
    date: "24 April 2026",
    title: "Adab Imam dan Khatib di Dalam dan di Luar Ibadah",
    excerpt: "Pembahasan mengenai kelayakan menjadi imam, kewajiban meluruskan saf, pelaksanaan shalat yang ringkas dan sempurna, serta adab seorang khatib.",
    content: "Imam dan khatib memegang amanah penting dalam membimbing jamaah. Karena itu, keduanya perlu memperhatikan ilmu, kesiapan diri, keteladanan, serta kemaslahatan umat dalam setiap pelaksanaan ibadah.",
    image: "/aktivitas-adab-imam-khatib.png",
  },
  {
    id: "2",
    category: "Majelis Taklim",
    date: "12 Mei 2026",
    title: "Kuliah Subuh Subulussalam YBUQ",
    excerpt: "Kegiatan rutin kajian subuh bersama para santri dan masyarakat sekitar dalam memperdalam pemahaman Al-Qur'an dan Sunnah.",
    content: "Kegiatan rutin majelis taklim dan kuliah subuh diselenggarakan untuk mempererat ukhuwah islamiyah dan meningkatkan pemahaman keagamaan jamaah.",
    image: "/hero-campus-close.jpeg",
  },
  {
    id: "3",
    category: "Peringatan Hari Besar",
    date: "18 Juni 2026",
    title: "Peringatan Maulid Nabi Muhammad SAW di Masjid Al-Huda",
    excerpt: "Rangkaian acara peringatan maulid dengan pembacaan sholawat, ceramah agama, dan santunan anak yatim.",
    content: "Peringatan Maulid Nabi diselenggarakan sebagai bentuk rasa cinta dan penghormatan kepada Rasulullah SAW dengan meneladani akhlak mulia beliau.",
    image: "/masjid-buq-24.jpg",
  },
];

export const initialHeroConfig: HeroConfig = {
  englishVideo: "/hero-video.mp4",
  welcomeTitleId: "Pondok Pesantren Bina Ummah Qur'aniyah",
  welcomeTitleEn: "Bina Ummah Qur'aniyah Foundation",
  welcomeTitleAr: "مؤسسة بناء الأمة القرآنية",
  welcomeDescId: "Pondok Pesantren yang bercirikan Tahfidz Al-Qur'an (menghafal al-Qur'an) memiliki prinsip terwujudnya generasi ahli Al-Qur'an yang Tangguh dan berakhlak mulia, agar mampu menghadapi tantangan dan mengembangkan diri santri dalam memenuhi kebutuhan umat.",
  welcomeDescEn: "An Islamic Boarding School specializing in Tahfidz Al-Qur'an, dedicated to nurturing resilient, noble Qur'anic scholars equipped to serve society.",
  welcomeDescAr: "مؤسسة تعليمية إسلامية متخصصة في تحفيظ القرآن الكريم، تهدف إلى إعداد جيل قرآني قوي وذو أخلاق فاضلة قادر على خدمة الأمة.",
};

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@example.com",
    phone: "08123456789",
    subject: "Pendaftaran Santri Baru 2026/2027",
    message: "Assalamu'alaikum, mohon informasi mengenai syarat dan jadwal pendaftaran santri baru program Tahfidz Al-Qur'an YBUQ. Terima kasih.",
    createdAt: "2026-09-10 09:15",
    read: false,
  },
  {
    id: "msg-2",
    name: "Siti Rahmah",
    email: "siti.rahmah@example.com",
    phone: "08571234567",
    subject: "Infaq & Sedekah Pembangunan Masjid BUQ-24",
    message: "Assalamu'alaikum wrm wb, saya ingin berinfaq untuk pembangunan Masjid BUQ-24. Boleh dibantu rekening resmi atas nama Yayasan?",
    createdAt: "2026-09-11 14:20",
    read: true,
  },
];

export const initialSettings: SiteSettings = {
  secretariatTitle: "Sekretariat YBUQ",
  address: "Jl. Lapangan Merah 1 No. 99, RT 011/RW 007, Kel. Srengseng Sawah, Kec. Jagakarsa, Jakarta Selatan 12640",
  email: "info@ybuq.or.id",
  phone1: "0815 8949 619",
  phone2: "0856 7558 840",
  operatingHours: "08:00 – 17:00 WIB (Setiap Hari)",
  instagramUrl: "https://www.instagram.com/bina_ummah_quraniyah/",
  youtubeUrl: "https://www.youtube.com/@BinaUmmahQuraniyah",
};

// Client LocalStorage Helpers for Static Export Mode
export function getClientArticles(): Article[] {
  if (typeof window === "undefined") return initialArticles;
  const stored = localStorage.getItem("ybuq_cms_articles");
  if (!stored) return initialArticles;
  try {
    return JSON.parse(stored);
  } catch {
    return initialArticles;
  }
}

export function saveClientArticles(articles: Article[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("ybuq_cms_articles", JSON.stringify(articles));
}

export function getClientHero(): HeroConfig {
  if (typeof window === "undefined") return initialHeroConfig;
  const stored = localStorage.getItem("ybuq_cms_hero");
  if (!stored) return initialHeroConfig;
  try {
    return JSON.parse(stored);
  } catch {
    return initialHeroConfig;
  }
}

export function saveClientHero(hero: HeroConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("ybuq_cms_hero", JSON.stringify(hero));
}

export function getClientMessages(): ContactMessage[] {
  if (typeof window === "undefined") return initialMessages;
  const stored = localStorage.getItem("ybuq_cms_messages");
  if (!stored) return initialMessages;
  try {
    return JSON.parse(stored);
  } catch {
    return initialMessages;
  }
}

export function saveClientMessages(messages: ContactMessage[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("ybuq_cms_messages", JSON.stringify(messages));
}

export function getClientSettings(): SiteSettings {
  if (typeof window === "undefined") return initialSettings;
  const stored = localStorage.getItem("ybuq_cms_settings");
  if (!stored) return initialSettings;
  try {
    return JSON.parse(stored);
  } catch {
    return initialSettings;
  }
}

export function saveClientSettings(settings: SiteSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("ybuq_cms_settings", JSON.stringify(settings));
}

