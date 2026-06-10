import { FACTS } from '@/content/copy.ru';

export default function FactsBar() {
  return (
    <section aria-label="Ключевые факты" className="border-y border-gold/10 bg-basalt-2">
      <dl className="container-x grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-6">
        {FACTS.map((fact) => (
          <div key={fact.label} className="text-center">
            <dt className="order-2 mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {fact.label}
            </dt>
            <dd className="font-display text-[22px] text-cream">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
