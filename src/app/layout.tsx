import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { HistoryIcon } from "lucide-react";
import Header from "@/components/Header";

const font = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shiori - Read Manga & Manhwa Online Free",
  description:
    "Discover Shiori, your ultimate destination for manga and manhwa. Enjoy thousands of high-quality chapters from top genres, updated daily — all free to read!",
  keywords: [
    "manga reader",
    "read manga online",
    "read manhwa",
    "free manga",
    "manga updates",
    "webtoon",
    "Shiori manga",
    "Shiori manhwa",
  ],
  openGraph: {
    title: "Shiori - Read Manga & Manhwa Online Free",
    description:
      "Explore thousands of top-rated manga and manhwa chapters with Shiori. High-quality scans, fast updates, and a user-friendly experience — all free.",
    siteName: "Shiori",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
