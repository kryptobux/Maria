/**
 * Typed access to the photo slot manifest (HANDOVER §6.1).
 * The raw data lives in photos.manifest.json so that the node scripts
 * (scripts/source-photos.mjs, scripts/build-images.mjs) can read it
 * without a TypeScript loader.
 */
import manifest from './photos.manifest.json';

export type PhotoMood = 'basalt' | 'ember' | 'garnet' | 'sea' | 'paper' | 'gold';

export type PhotoSlot = {
  id: string;
  ratio: string; // e.g. "3:2"
  minWidth: number;
  motif: string;
  queries: string[];
  altRu: string;
  mood: PhotoMood;
};

export const PHOTO_SLOTS = manifest.slots as PhotoSlot[];

export const SLOT_BY_ID = Object.fromEntries(PHOTO_SLOTS.map((s) => [s.id, s])) as Record<
  string,
  PhotoSlot
>;

export function ratioToNumber(ratio: string): number {
  const [w, h] = ratio.split(':').map(Number);
  return w / h;
}
