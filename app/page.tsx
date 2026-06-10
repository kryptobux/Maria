import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FactsBar from '@/components/FactsBar';
import Maria from '@/components/Maria';
import WhyEtna from '@/components/WhyEtna';
import RouteMap from '@/components/RouteMap';
import DayCards from '@/components/DayCards';
import Hotels from '@/components/Hotels';
import Tariffs from '@/components/Tariffs';
import Film from '@/components/Film';
import Faq from '@/components/Faq';
import EarlyBird from '@/components/EarlyBird';
import BookingForm, { type LeadEndpoint } from '@/components/BookingForm';
import Footer from '@/components/Footer';
import { buildAllMapLinks } from '@/lib/maps';
import { DAY_ROUTES } from '@/content/routes';
import { META, PROGRAM } from '@/content/copy.ru';
import { PRICES, SITE, isTodo, siteOrigin, telegramHref, whatsappHref } from '@/content/site.config';

/**
 * Lead submission strategy (HANDOVER §2/§7.2):
 *  - static export → POST straight to the n8n webhook (token in payload),
 *  - server build  → POST to /api/lead, which proxies + injects the token,
 *  - no webhook configured → mailto fallback, or a plain error hint.
 * Resolved at build/render time on the server, so no secret-handling in
 * client code beyond what static export inherently requires.
 */
function resolveLeadEndpoint(): LeadEndpoint {
  const isStatic = process.env.STATIC_EXPORT === '1';
  const webhook = process.env.N8N_WEBHOOK_URL;
  if (isStatic && webhook) {
    return { mode: 'direct', url: webhook, token: process.env.N8N_TOKEN ?? '' };
  }
  if (!isStatic) {
    return { mode: 'api', url: '/api/lead' };
  }
  if (!isTodo(SITE.email)) return { mode: 'mailto', email: SITE.email };
  return { mode: 'none' };
}

function jsonLd() {
  const origin = siteOrigin();
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'От кратера — в бокал: винное путешествие по Сицилии',
    description: META.description,
    inLanguage: 'ru',
    touristType: 'Wine tourism',
    provider: {
      '@type': 'Person',
      name: 'Maria Schröder',
      jobTitle: 'Sommelière',
    },
    itinerary: {
      '@type': 'ItemList',
      itemListElement: PROGRAM.days.map((day, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${day.date} — ${day.title}`,
      })),
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Riserva',
        price: String(PRICES.riserva),
        priceCurrency: PRICES.currency,
        availability: 'https://schema.org/LimitedAvailability',
        url: `${origin}/#tariffs`,
      },
      {
        '@type': 'Offer',
        name: 'Gran Cru',
        price: String(PRICES.granCru),
        priceCurrency: PRICES.currency,
        availability: 'https://schema.org/LimitedAvailability',
        url: `${origin}/#tariffs`,
      },
    ],
  };
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

export default function Page() {
  const mapLinks = buildAllMapLinks();
  const endpoint = resolveLeadEndpoint();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <FactsBar />
        <Maria />
        <WhyEtna />
        <RouteMap routes={DAY_ROUTES} links={mapLinks} />
        <DayCards />
        <Hotels />
        <Tariffs />
        <Film />
        <Faq />
        <EarlyBird />
        <BookingForm
          endpoint={endpoint}
          whatsappHref={whatsappHref()}
          telegramHref={telegramHref()}
        />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
    </>
  );
}
