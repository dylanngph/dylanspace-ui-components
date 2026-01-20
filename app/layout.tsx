import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DylanSpace UI Components",
  description: "DylanSpace UI Components",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
