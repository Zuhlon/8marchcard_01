import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "С 8 Марта! | Международный женский день",
  description: "Интерактивная открытка к 8 Марта в стиле японской сакуры для UX-дизайнеров",
  keywords: ["8 Марта", "сакура", "открытка", "поздравление", "UX дизайн"],
  authors: [{ name: "С любовью" }],
  icons: {
    icon: "/sakura-icon.png",
  },
  openGraph: {
    title: "С 8 Марта!",
    description: "Интерактивная открытка в стиле японской сакуры",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
