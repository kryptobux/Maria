import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { LEGAL } from '@/content/copy.ru';

export const metadata: Metadata = {
  title: LEGAL.pages.agb.title,
  robots: { index: false, follow: false },
};

export default function Agb() {
  return <LegalPage slug="agb" />;
}
