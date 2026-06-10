/**
 * Access to processed images (output of scripts/build-images.mjs).
 * While a slot has no processed image yet, components fall back to the
 * elegant PlaceholderArt (allowed during build; real photos are part of
 * the Definition of Done — tracked in KANBAN.md).
 */
import generated from '@/content/photos.generated.json';

export type GeneratedImage = {
  widths: number[];
  /** aspect = width / height after crop */
  aspect: number;
  lqip: string;
  formats: string[]; // e.g. ["avif","webp","jpg"]
};

export type PhotoCredit = {
  slot: string;
  title: string;
  author: string;
  license: string;
  sourceUrl: string;
};

type Registry = {
  images: Record<string, GeneratedImage>;
  credits: PhotoCredit[];
};

const registry = generated as unknown as Registry;

export function getGeneratedImage(slotId: string): GeneratedImage | null {
  return registry.images[slotId] ?? null;
}

export function getCredits(): PhotoCredit[] {
  return registry.credits ?? [];
}

export function srcSetFor(slotId: string, format: string): string {
  const img = registry.images[slotId];
  if (!img) return '';
  return img.widths.map((w) => `/images/${slotId}/${slotId}-${w}.${format} ${w}w`).join(', ');
}

export function fallbackSrcFor(slotId: string): string {
  const img = registry.images[slotId];
  if (!img) return '';
  const w = img.widths.includes(960) ? 960 : img.widths[img.widths.length - 1];
  return `/images/${slotId}/${slotId}-${w}.jpg`;
}
