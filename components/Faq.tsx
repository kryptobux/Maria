import { FAQ } from '@/content/copy.ru';

export default function Faq() {
  return (
    <section id="faq" className="section-pad bg-paper text-ink">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow eyebrow--garnet">{FAQ.eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(1.9rem,4vw,2.7rem)] text-ink">{FAQ.title}</h2>

          <div className="mt-10">
            {FAQ.items.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p className="max-w-prose pb-6 text-[15px] leading-relaxed text-ink/75">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
