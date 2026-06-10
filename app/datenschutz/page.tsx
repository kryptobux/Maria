import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { LEGAL } from '@/content/copy.ru';

export const metadata: Metadata = {
  title: LEGAL.pages.datenschutz.title,
  robots: { index: false, follow: false },
};

export default function Datenschutz() {
  return <LegalPage slug="datenschutz" />;
}
