import { socialLinks } from '@/lib/content/portfolio';
import { SocialSectionType } from '@/lib/types/sections';


export const socialSection: SocialSectionType = {
    socialLinks: [
    {
        icon: 'uil:github',
        url: socialLinks.github,
    },
    {
        icon: 'lucide:linkedin',
        url: socialLinks.linkedin,
    },
    ],
};