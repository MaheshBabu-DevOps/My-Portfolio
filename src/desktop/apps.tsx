import About from './apps/About';
import Education from './apps/Education';
import Experience from './apps/Experience';
import Finder from './apps/Finder';
import Mail from './apps/Mail';
import Resume from './apps/Resume';
import Skills from './apps/Skills';
import Terminal from './apps/Terminal';
import { AppContext, AppId } from './types';
import { ReactNode } from 'react';

export type AppDef = {
  id: AppId;
  title: string;
  dock?: boolean; // shown in the dock; the others are desktop icons
  size: { w: number; h: number };
  render: (ctx: AppContext) => ReactNode;
};

// Order here is the order of the dock icons.
export const APPS: AppDef[] = [
  { id: 'terminal', dock: true, title: 'Terminal', size: { w: 700, h: 430 }, render: (ctx) => <Terminal {...ctx} /> },
  { id: 'finder', dock: true, title: 'Projects', size: { w: 800, h: 500 }, render: () => <Finder /> },
  { id: 'about', title: 'About Me', size: { w: 660, h: 400 }, render: () => <About /> },
  { id: 'experience', title: 'Experience', size: { w: 780, h: 500 }, render: () => <Experience /> },
  { id: 'skills', title: 'Skills', size: { w: 740, h: 500 }, render: () => <Skills /> },
  { id: 'education', title: 'Education', size: { w: 620, h: 460 }, render: () => <Education /> },
  { id: 'mail', dock: true, title: 'Contact', size: { w: 540, h: 340 }, render: () => <Mail /> },
  { id: 'resume', dock: true, title: 'Resume', size: { w: 780, h: 560 }, render: () => <Resume /> },
];

export const APP_BY_ID = Object.fromEntries(APPS.map((app) => [app.id, app])) as Record<AppId, AppDef>;
