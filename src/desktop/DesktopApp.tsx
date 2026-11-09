'use client';
import AppGrid from './AppGrid';
import { APP_BY_ID, APPS } from './apps';
import DesktopIcons from './DesktopIcons';
import Dock from './Dock';
import MenuBar from './MenuBar';
import { LAYOUT, WALLPAPER } from './theme';
import { AppId, Theme, WindowState } from './types';
import Window from './Window';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_WIDTH = 900;

export default function DesktopApp() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [tooSmall, setTooSmall] = useState(false);
  const [showApps, setShowApps] = useState(false);
  // Ubuntu is the default look. /desktop?style=mac switches to the macOS look.
  const [theme, setTheme] = useState<Theme>('ubuntu');
  const themeRef = useRef<Theme>('ubuntu');
  const zCounter = useRef(10);

  const openApp = useCallback((id: AppId) => {
    setWindows((current) => {
      const z = ++zCounter.current;
      if (current.some((w) => w.id === id)) {
        return current.map((w) => (w.id === id ? { ...w, minimized: false, z } : w));
      }
      const { w, h } = APP_BY_ID[id].size;
      const layout = LAYOUT[themeRef.current];
      // Stagger new windows diagonally so every title bar stays visible, and keep them on screen.
      const step = current.length % 6;
      const x = Math.max(layout.left + 16, Math.min(layout.left + 24 + step * 70, window.innerWidth - w - 24));
      const y = Math.max(layout.top + 12, Math.min(layout.top + 16 + step * 38, window.innerHeight - h - layout.bottom - 24));
      return [...current, { id, x, y, w, h, z, minimized: false, maximized: false }];
    });
  }, []);

  // Open windows on first load. Deep links work too, for example /desktop?open=terminal,finder
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chosen: Theme = params.get('style') === 'mac' ? 'mac' : 'ubuntu';
    themeRef.current = chosen;
    setTheme(chosen);
    setTooSmall(window.innerWidth < MIN_WIDTH);
    const requested = params.get('open');
    const ids = (requested ? requested.split(',') : []).filter(
      (id): id is AppId => id in APP_BY_ID
    );
    ids.forEach((id) => openApp(id));
  }, [openApp]);

  const closeApp = useCallback((id: AppId) => {
    setWindows((current) => current.filter((w) => w.id !== id));
  }, []);

  function update(id: AppId, patch: Partial<WindowState>) {
    setWindows((current) => current.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }

  function focus(id: AppId) {
    update(id, { z: ++zCounter.current });
  }

  const visible = windows.filter((w) => !w.minimized);
  const top = visible.reduce<WindowState | null>((best, w) => (!best || w.z > best.z ? w : best), null);

  if (tooSmall) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2c001e] p-8 text-center text-white">
        <div className="max-w-sm space-y-4">
          <p className="text-lg font-semibold">The desktop view needs a larger screen.</p>
          <p className="text-sm text-white/70">Open it on a laptop or desktop, or use the regular site.</p>
          <Link href="/" className="inline-block rounded-lg bg-white/15 px-4 py-2 hover:bg-white/25">
            Go to the regular site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{ background: WALLPAPER[theme] }}>
      <MenuBar
        activeTitle={top ? APP_BY_ID[top.id].title : 'Desktop'}
        theme={theme}
        hasWindows={windows.length > 0}
        onActivities={() => setShowApps((open) => !open)}
        onCloseAll={() => setWindows([])}
      />
      <DesktopIcons theme={theme} top={LAYOUT[theme].top} openApp={openApp} />
      <main className="absolute inset-0">
        {windows.map((win) => {
          const app = APP_BY_ID[win.id];
          return (
            <Window
              key={win.id}
              win={win}
              title={app.title}
              active={top?.id === win.id}
              theme={theme}
              onFocus={() => focus(win.id)}
              onClose={() => closeApp(win.id)}
              onMinimize={() => update(win.id, { minimized: true })}
              onToggleMaximize={() => update(win.id, { maximized: !win.maximized, z: ++zCounter.current })}
              onMove={(x, y) => update(win.id, { x, y })}
            >
              {app.render({ openApp, closeApp, theme })}
            </Window>
          );
        })}
      </main>
      <Dock
        apps={APPS.filter((a) => a.dock).map((a) => ({ id: a.id, title: a.title }))}
        windows={windows}
        theme={theme}
        onOpen={openApp}
        onShowApps={() => setShowApps(true)}
      />
      {showApps && (
        <AppGrid
          apps={APPS.map((a) => ({ id: a.id, title: a.title }))}
          onOpen={openApp}
          onClose={() => setShowApps(false)}
        />
      )}
    </div>
  );
}
