import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

export function generateReferralCode(username: string): string {
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${username.toUpperCase().slice(0, 4)}${randomStr}`;
}

export function validateUrl(url: string, platform: "shopee" | "tiktok"): boolean {
  if (platform === "shopee") {
    return url.includes("shopee.co.id") || url.includes("shopee.com");
  }
  return url.includes("tiktok.com") || url.includes("vt.tiktok.com");
}

export function calculateKoin(views: number): number {
  return Math.floor(views / 1000);
}

export function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  const intervals = {
    tahun: 31536000,
    bulan: 2592000,
    minggu: 604800,
    hari: 86400,
    jam: 3600,
    menit: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit} yang lalu`;
    }
  }

  return "Baru saja";
}
