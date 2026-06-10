import Link from 'next/link';
import { BRAND, FOOTER } from '@/content/copy.ru';
import { SITE, isTodo, mailtoHref } from '@/content/site.config';

export default function Footer() {
  const email = mailtoHref();
  return (
    <footer className="border-t border-gold/10 bg-basalt py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-[15px] tracking-[0.28em] text-cream">
              {BRAND.wordmark}
            </p>
            <p className="mt-1 text-[11px] tracking-[0.14em] text-muted">{BRAND.tagline}</p>
            {email && !isTodo(SITE.email) ? (
              <a
                href={email}
                className="mt-4 inline-block text-[13px] text-gold underline-offset-4 hover:underline"
              >
                {SITE.email}
              </a>
            ) : null}
          </div>

          <nav aria-label="Правовая информация" className="flex flex-col gap-2.5 md:items-end">
            {FOOTER.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-muted transition-colors hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hairline my-8" />

        <p className="max-w-3xl text-[12px] leading-relaxed text-muted/80">{FOOTER.legalLine}</p>
        <p className="mt-3 text-[12px] text-muted/60">{FOOTER.copyright}</p>
      </div>
    </footer>
  );
}
