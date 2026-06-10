import type { Metadata } from 'next';
import Link from 'next/link';
import { CREDITS_PAGE } from '@/content/copy.ru';
import { getCredits } from '@/lib/photos';

export const metadata: Metadata = {
  title: CREDITS_PAGE.title,
};

export default function Credits() {
  const credits = getCredits();
  return (
    <main className="flex min-h-svh flex-col bg-basalt">
      <div className="container-x flex-1 py-24">
        <Link
          href="/"
          className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold underline-offset-4 hover:underline"
        >
          {CREDITS_PAGE.back}
        </Link>
        <h1 className="h-display mt-8 max-w-2xl text-[clamp(1.8rem,4vw,2.6rem)] text-cream">
          {CREDITS_PAGE.title}
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">{CREDITS_PAGE.intro}</p>

        {credits.length === 0 ? (
          <p className="mt-10 max-w-xl rounded-md border border-gold/15 bg-basalt-2 p-6 leading-relaxed text-cream/80">
            {CREDITS_PAGE.empty}
          </p>
        ) : (
          <ul className="mt-10 max-w-2xl divide-y divide-gold/10">
            {credits.map((credit) => (
              <li key={`${credit.slot}-${credit.sourceUrl}`} className="py-4">
                <p className="text-[15px] text-cream">{credit.title}</p>
                <p className="mt-1 text-[13px] text-muted">
                  © {credit.author} · {credit.license} ·{' '}
                  <a
                    href={credit.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold underline-offset-4 hover:underline"
                  >
                    источник
                  </a>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
