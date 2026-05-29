import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexvora Studio - Platform Digital All-in-One",
  description: "Nexvora Studio adalah platform digital all-in-one untuk meningkatkan trafik marketplace, mengelola tren produk, memanfaatkan AI Creator, dan mengembangkan bisnis digital secara lebih cepat, cerdas, dan efisien.",
  keywords: ["nexvora", "marketplace", "trafik", "shopee", "tiktok", "AI creator", "bisnis digital"],
  authors: [{ name: "Nexvora Studio" }],
  openGraph: {
    title: "Nexvora Studio - Platform Digital All-in-One",
    description: "Platform digital all-in-one untuk meningkatkan trafik marketplace dan mengembangkan bisnis digital.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
