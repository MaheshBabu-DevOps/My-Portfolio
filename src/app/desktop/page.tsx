import DesktopApp from '@/desktop/DesktopApp';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mahesh Babu | Desktop view',
  description: 'An interactive desktop-style version of the portfolio of Mahesh Babu, AWS DevOps Engineer.',
};

export default function DesktopPage() {
  return <DesktopApp />;
}
