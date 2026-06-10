import Link from 'next/link';
import { LEGAL } from '@/content/copy.ru';

export default function LegalPage({ slug }: { slug: keyof typeof LEGAL.pages }) {
  const page = LEGAL.pages[slug];
  return (
    <main className="flex min-h-svh flex-col bg-basalt">
      <div className="container-x flex-1 py-24">
        <Link
          href="/"
          className="text-[12px] font-bold uppercase tracking-[0.16em] text-gold underline-offset-4 hover:underline"
        >
          {LEGAL.back}
        </Link>
        <h1 className="h-display mt-8 max-w-2xl text-[clamp(1.8rem,4vw,2.6rem)] text-cream">
          {page.title}
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-muted">{page.body}</p>
      </div>
    </main>
  );
}
