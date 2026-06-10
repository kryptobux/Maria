import { BRAND, NAV } from '@/content/copy.ru';

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/10 bg-basalt/80 backdrop-blur-md">
      <div className="container-x flex h-[64px] items-center justify-between gap-6">
        <a href="#top" className="group flex flex-col leading-tight">
          <span className="font-display text-[15px] tracking-[0.28em] text-cream transition-colors group-hover:text-gold">
            {BRAND.wordmark}
          </span>
          <span className="text-[10px] tracking-[0.14em] text-muted">{BRAND.tagline}</span>
        </a>

        <nav aria-label="Разделы страницы" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#booking" className="btn btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
          Забронировать
        </a>
      </div>

      {/* Mobile: horizontally scrollable anchor row, no JS menu */}
      <nav
        aria-label="Разделы страницы (мобильное меню)"
        className="no-scrollbar flex gap-5 overflow-x-auto border-t border-gold/10 px-5 py-2.5 lg:hidden"
      >
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#booking"
          className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.14em] text-ember"
        >
          Забронировать
        </a>
      </nav>
    </header>
  );
}
