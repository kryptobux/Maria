import type { Metadata, Viewport } from 'next';
import { Prata, Manrope, Cormorant_Garamond } from 'next/font/google';
import { META } from '@/content/copy.ru';
import { siteOrigin } from '@/content/site.config';
import './globals.css';

// Self-hosted via next/font (DSGVO) — HANDOVER §2
const prata = Prata({
  weight: '400',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-prata',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['500', '600'],
  style: 'italic',
  subsets: ['cyrillic', 'latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: META.title,
  description: META.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: META.title,
    description: META.description,
    type: 'website',
    locale: 'ru_RU',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: META.ogAlt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META.title,
    description: META.description,
    images: ['/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#161110',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Cookieless analytics (Plausible/Umami style) — only when configured (§2)
  const analyticsUrl = process.env.NEXT_PUBLIC_ANALYTICS_URL;
  const analyticsDomain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

  return (
    <html lang="ru" className={`${prata.variable} ${manrope.variable} ${cormorant.variable}`}>
      <head>
        {analyticsUrl ? (
          <script defer src={analyticsUrl} data-domain={analyticsDomain ?? undefined} />
        ) : null}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
