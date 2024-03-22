import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scraper Monitor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-white text-black">
      <body className={font.className}>{children}</body>
    </html>
  );
}
