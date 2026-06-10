import { SLOT_BY_ID, ratioToNumber, type PhotoMood } from '@/content/photos.manifest';
import { getGeneratedImage, srcSetFor, fallbackSrcFor } from '@/lib/photos';

/**
 * Renders a photo slot. If scripts/build-images.mjs has produced assets for
 * the slot, a responsive <picture> (AVIF → WebP → JPEG) is emitted; until
 * then an intentional, art-directed placeholder keeps the layout elegant
 * (real photos remain part of the DoD — see KANBAN.md).
 */
type Props = {
  slotId: string;
  sizes: string;
  className?: string;
  /** Fill the parent box (e.g. hero background) instead of enforcing the slot ratio. */
  cover?: boolean;
  priority?: boolean;
  showCaption?: boolean;
};

const MOOD_BG: Record<PhotoMood, string> = {
  basalt:
    'radial-gradient(120% 90% at 75% 0%, rgba(212,80,43,0.28), transparent 55%), radial-gradient(80% 60% at 20% 100%, rgba(126,45,53,0.35), transparent 60%), linear-gradient(180deg, #221a16 0%, #161110 70%)',
  ember:
    'radial-gradient(90% 70% at 80% 85%, rgba(232,119,63,0.4), transparent 60%), linear-gradient(160deg, #221a16 10%, #43191f 80%)',
  garnet:
    'radial-gradient(100% 80% at 25% 15%, rgba(126,45,53,0.55), transparent 65%), linear-gradient(200deg, #221a16, #161110)',
  sea: 'radial-gradient(110% 80% at 70% 20%, rgba(58,110,114,0.45), transparent 60%), linear-gradient(180deg, #221a16, #161110)',
  paper:
    'radial-gradient(100% 80% at 70% 10%, rgba(200,163,95,0.30), transparent 60%), linear-gradient(180deg, #e8dec9, #d9cdb2)',
  gold: 'radial-gradient(80% 70% at 50% 30%, rgba(200,163,95,0.40), transparent 65%), linear-gradient(190deg, #221a16, #161110)',
};

/** Subtle topographic contour lines — echoes the route section's Höhenlinie. */
function ContourLines({ dark }: { dark: boolean }) {
  const stroke = dark ? 'rgba(200,163,95,0.16)' : 'rgba(29,23,20,0.14)';
  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M -20 ${190 + i * 26} C 90 ${130 + i * 22}, 160 ${230 + i * 18}, 270 ${165 + i * 24} S 400 ${200 + i * 20}, 430 ${150 + i * 26}`}
          fill="none"
          stroke={stroke}
          strokeWidth="1"
        />
      ))}
      <path
        d="M 120 218 L 200 96 L 286 218"
        fill="none"
        stroke={dark ? 'rgba(212,80,43,0.35)' : 'rgba(126,45,53,0.3)'}
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default function SmartImage({
  slotId,
  sizes,
  className = '',
  cover = false,
  priority = false,
  showCaption = true,
}: Props) {
  const slot = SLOT_BY_ID[slotId];
  const generated = getGeneratedImage(slotId);
  const ratio = slot ? ratioToNumber(slot.ratio) : 3 / 2;

  if (generated) {
    const img = (
      <picture>
        {generated.formats.includes('avif') && (
          <source type="image/avif" srcSet={srcSetFor(slotId, 'avif')} sizes={sizes} />
        )}
        {generated.formats.includes('webp') && (
          <source type="image/webp" srcSet={srcSetFor(slotId, 'webp')} sizes={sizes} />
        )}
        <img
          src={fallbackSrcFor(slotId)}
          srcSet={srcSetFor(slotId, 'jpg')}
          sizes={sizes}
          alt={slot?.altRu ?? ''}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className={cover ? 'h-full w-full object-cover' : 'h-auto w-full object-cover'}
          style={{
            ...(cover ? {} : { aspectRatio: String(generated.aspect) }),
            backgroundImage: `url(${generated.lqip})`,
            backgroundSize: 'cover',
          }}
        />
      </picture>
    );
    return <div className={`overflow-hidden ${className}`}>{img}</div>;
  }

  // Placeholder (slot not yet filled)
  const mood = slot?.mood ?? 'basalt';
  const dark = mood !== 'paper';
  return (
    <div
      role="img"
      aria-label={slot?.altRu ?? 'Фотография подбирается'}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: MOOD_BG[mood],
        ...(cover ? { height: '100%', width: '100%' } : { aspectRatio: String(ratio) }),
      }}
    >
      <ContourLines dark={dark} />
      {showCaption && slot ? (
        <span
          className={`absolute bottom-3 left-4 max-w-[85%] text-[10px] font-bold uppercase tracking-[0.18em] ${
            dark ? 'text-gold/70' : 'text-garnet/70'
          }`}
        >
          {slot.altRu} · фото подбирается
        </span>
      ) : null}
    </div>
  );
}
