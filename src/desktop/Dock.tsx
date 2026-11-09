'use client';
import { AppIcon } from './icons';
import { AppId, Theme, WindowState } from './types';

type Props = {
  apps: { id: AppId; title: string }[];
  windows: WindowState[];
  theme: Theme;
  onOpen: (id: AppId) => void;
  onShowApps: () => void;
};

export default function Dock({ apps, windows, theme, onOpen, onShowApps }: Props) {
  if (theme === 'ubuntu') {
    // Ubuntu style: a dark bar at the bottom. An orange dot marks open apps, and the grid
    // button at the end opens all applications.
    return (
      <nav
        aria-label="Dock"
        className="absolute bottom-2 left-1/2 z-[9000] flex -translate-x-1/2 items-center gap-1.5 rounded-2xl border border-white/10 bg-[#1b1b1b]/80 px-2.5 py-2 shadow-2xl backdrop-blur-xl"
      >
        {apps.map((app) => {
          const open = windows.some((w) => w.id === app.id);
          return (
            <button
              key={app.id}
              onClick={() => onOpen(app.id)}
              aria-label={`Open ${app.title}`}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors hover:bg-white/15 focus-visible:bg-white/15"
            >
              <AppIcon id={app.id} size={40} rounded="rounded-xl" />
              {open && (
                <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#e95420]" />
              )}
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {app.title}
              </span>
            </button>
          );
        })}
        <span className="mx-1 h-8 w-px bg-white/15" aria-hidden="true" />
        <button
          onClick={onShowApps}
          aria-label="Show applications"
          className="group relative flex h-12 w-12 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/15 focus-visible:bg-white/15"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
            {[5, 12, 19].flatMap((cx) => [5, 12, 19].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.9" />))}
          </svg>
          <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            Show Applications
          </span>
        </button>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Dock"
      className="absolute bottom-3 left-1/2 z-[9000] flex -translate-x-1/2 items-end gap-2 rounded-2xl border border-white/25 bg-white/20 px-3 py-2 shadow-2xl backdrop-blur-xl"
    >
      {apps.map((app) => {
        const open = windows.some((w) => w.id === app.id);
        return (
          <button
            key={app.id}
            onClick={() => onOpen(app.id)}
            aria-label={`Open ${app.title}`}
            className="group relative flex flex-col items-center transition-transform duration-150 hover:-translate-y-2 hover:scale-125 focus-visible:-translate-y-2 focus-visible:scale-125"
          >
            <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {app.title}
            </span>
            <AppIcon id={app.id} />
            <span className={`mt-1 h-1 w-1 rounded-full ${open ? 'bg-white/90' : 'bg-transparent'}`} />
          </button>
        );
      })}
    </nav>
  );
}
