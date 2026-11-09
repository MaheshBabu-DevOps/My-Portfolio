'use client';
import { AppIcon } from './icons';
import { AppId, Theme } from './types';
import { useState } from 'react';

// Files and folders on the desktop. Double-click (or press Enter) to open.
const ITEMS: { id: AppId; label: string }[] = [
  { id: 'about', label: 'About.txt' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Certificates' },
];

type Props = {
  theme: Theme;
  top: number;
  openApp: (id: AppId) => void;
};

export default function DesktopIcons({ theme, top, openApp }: Props) {
  const [selected, setSelected] = useState<AppId | null>(null);

  return (
    <div
      className="absolute right-6 z-[5] flex flex-col items-center gap-3"
      style={{ top: top + 20 }}
      onClick={() => setSelected(null)}
    >
      {ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={(event) => {
            event.stopPropagation();
            setSelected(item.id);
          }}
          onDoubleClick={() => openApp(item.id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') openApp(item.id);
          }}
          aria-label={`Open ${item.label}`}
          className={`flex w-24 flex-col items-center gap-1.5 rounded-lg px-1 py-2 text-white ${
            selected === item.id ? (theme === 'ubuntu' ? 'bg-[#e95420]/40' : 'bg-sky-500/40') : 'hover:bg-white/10'
          }`}
        >
          <AppIcon id={item.id} size={46} rounded="rounded-xl" />
          <span className="text-center text-xs font-medium leading-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
