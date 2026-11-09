'use client';
import { Theme } from './types';
import { useEffect, useState } from 'react';

type Props = {
  activeTitle: string;
  theme: Theme;
  hasWindows?: boolean;
  onActivities?: () => void;
  onCloseAll?: () => void;
};

export default function MenuBar({ activeTitle, theme, hasWindows = false, onActivities, onCloseAll }: Props) {
  // The clock is set after mount so the server and browser HTML always match.
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  const clock = now
    ? now.toLocaleString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const otherStyle = theme === 'ubuntu' ? 'mac' : 'ubuntu';
  const links = (
    <>
      <a
        href={`/desktop?style=${otherStyle}`}
        className="hidden rounded px-2 py-0.5 text-white/70 hover:bg-white/15 hover:text-white md:inline"
      >
        {theme === 'ubuntu' ? 'macOS style' : 'Ubuntu style'}
      </a>
      <a href="/" className="rounded px-2 py-0.5 text-white/80 hover:bg-white/15 hover:text-white">
        Classic site
      </a>
    </>
  );

  if (theme === 'ubuntu') {
    return (
      <header className="absolute inset-x-0 top-0 z-[9500] flex h-7 items-center justify-between bg-black px-3 text-[13px] font-medium text-white">
        <div className="flex items-center gap-4">
          <button onClick={onActivities} className="rounded-full px-3 py-0.5 hover:bg-white/15">
            Activities
          </button>
          <span className="text-white/90">{activeTitle}</span>
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 tabular-nums">{clock}</span>
        <div className="flex items-center gap-3">
          {hasWindows && (
            <button onClick={onCloseAll} className="rounded px-2 py-0.5 text-white/80 hover:bg-white/15 hover:text-white">
              Close all windows
            </button>
          )}
          {links}
          <span className="flex items-center gap-2 rounded-full px-2 text-white/90" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 9a15 15 0 0120 0M5 12.5a10 10 0 0114 0M8.5 16a5 5 0 017 0" />
              <circle cx="12" cy="19" r="1" fill="currentColor" />
            </svg>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 9v6h4l5 4V5L8 9z" />
              <path d="M16.5 8.5a5 5 0 010 7" />
            </svg>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="17" height="10" rx="2" />
              <path d="M22 11v2" />
              <path d="M5 10v4M8.5 10v4M12 10v4" />
            </svg>
          </span>
        </div>
      </header>
    );
  }

  return (
    <header className="absolute inset-x-0 top-0 z-[9500] flex h-7 items-center justify-between bg-black/30 px-4 text-[13px] text-white/90 backdrop-blur-xl">
      <div className="flex items-center gap-5">
        <span className="font-semibold tracking-tight">Mahesh Babu</span>
        <span className="font-semibold">{activeTitle}</span>
        <span className="hidden gap-4 text-white/70 md:flex">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Window</span>
          <span>Help</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        {links}
        <span className="tabular-nums">{clock}</span>
      </div>
    </header>
  );
}
