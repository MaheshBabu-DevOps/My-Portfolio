'use client';
import { SocialLinkType } from '@/lib/types';
import dynamic from 'next/dynamic';

import SocialLink from './SocialLink';

const Icon = dynamic(() => import('@iconify/react').then((m) => ({ default: m.Icon })), { ssr: false });

const SocialIcon = ({ icon, url }: SocialLinkType) => {
  return (
    <li>
      <SocialLink href={url}>
        <Icon icon={icon} width={24} height={24} />
      </SocialLink>
    </li>
  );
};

export default SocialIcon;
