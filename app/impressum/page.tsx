import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { LEGAL } from '@/content/copy.ru';

export const metadata: Metadata = {
  title: LEGAL.pages.impressum.title,
  robots: { index: false, follow: false },
};

export default function Impressum() {
  return <LegalPage slug="impressum" />;
}
