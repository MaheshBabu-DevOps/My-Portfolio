import { NavbarSectionType } from '@/lib/types/sections';
import { SHOW_PROJECTS, resumeFileName } from '@/lib/utils/config';

export const navbarSection: NavbarSectionType = {
    navLinks: [
        { name: 'about', url: '/#about'},
        { name: 'skills', url: '/#skills'},
        { name: 'experience', url: '/#experience' },
        ...(SHOW_PROJECTS ? [{ name: 'projects', url: '/#projects' }] : []),
        { name: 'contact', url: '/#contact' },
    ],
    cta: {
        title: 'resume',
        url: `/${resumeFileName}`,
    },
}