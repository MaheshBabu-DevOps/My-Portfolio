import { HeroSectionType } from '@/lib/types/sections'
import { resumeFileName } from '@/lib/utils/config'

export const heroSection: HeroSectionType = {
    subtitle: 'Hi, my name is',
    title: 'Mahesh Babu',
    tagline: '',
    description: "I'm an AWS DevOps Engineer with 3.7 years of experience in CI/CD automation, cloud infrastructure, and containerized environments.",
    specialText: "",
    items:[
        'AWS DevOps Engineer',
        'Cloud Engineer',
        'DevOps Engineer',
        'Computer Vision Engineer (AI)',
      ],
    cta: {
        title: 'see my resume',
        url: `/${resumeFileName}`,
        hideInDesktop: true,
    },
};