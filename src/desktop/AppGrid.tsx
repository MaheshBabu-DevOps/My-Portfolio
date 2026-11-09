'use client';
import { AppIcon } from './icons';
import { AppId } from './types';
import { useEffect } from 'react';

type Props = {
  apps: { id: AppId; title: string }[];
  onOpen: (id: AppId) => void;
  onClose: () => void;
};

// The "Show Applications" screen: every app in one grid, like the Ubuntu overview.
export default function AppGrid({ apps, onOpen, onClose }: Props) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label="Applications"
      className="absolute inset-0 z-[9200] flex items-center justify-center bg-black/60 pt-7 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div className="grid max-w-2xl grid-cols-4 gap-x-10 gap-y-9 px-6">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={(event) => {
              event.stopPropagation();
              onOpen(app.id);
              onClose();
            }}
            className="flex w-24 flex-col items-center gap-2 rounded-xl p-2 text-white hover:bg-white/10 focus-visible:bg-white/10"
          >
            <AppIcon id={app.id} size={64} rounded="rounded-2xl" />
            <span className="text-sm font-medium">{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
