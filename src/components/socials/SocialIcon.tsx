'use client';
import { SocialLinkType } from '@/lib/types';

import ClientIcon from '@/components/icons/ClientIcon';

import SocialLink from './SocialLink';

const SocialIcon = ({ icon, url }: SocialLinkType) => {
  return (
    <li>
      <SocialLink href={url}>
        <ClientIcon icon={icon} width={24} height={24} />
      </SocialLink>
    </li>
  );
};

export default SocialIcon;
