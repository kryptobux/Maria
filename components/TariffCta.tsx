'use client';

/**
 * Tariff CTA presets the tariff <select> in the booking form (§7.3) via a
 * CustomEvent, then lets the anchor perform the scroll to #booking.
 */
type Props = {
  tariffOption: string;
  label: string;
  variant: 'primary' | 'ghost';
};

export const PRESET_TARIFF_EVENT = 'preset-tariff';

export default function TariffCta({ tariffOption, label, variant }: Props) {
  return (
    <a
      href="#booking"
      className={`btn mt-8 w-full ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'}`}
      onClick={() => {
        window.dispatchEvent(new CustomEvent(PRESET_TARIFF_EVENT, { detail: tariffOption }));
      }}
    >
      {label}
    </a>
  );
}
