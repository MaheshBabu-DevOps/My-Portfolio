'use client';
import { LAYOUT } from './theme';
import { Theme, WindowState } from './types';
import { ReactNode, useRef } from 'react';

type Props = {
  win: WindowState;
  title: string;
  active: boolean;
  theme: Theme;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onMove: (x: number, y: number) => void;
  children: ReactNode;
};

const iconProps = {
  width: 12,
  height: 12,
  viewBox: '0 0 12 12',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
};

export default function Window({
  win,
  title,
  active,
  theme,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
}: Props) {
  const drag = useRef<{ dx: number; dy: number } | null>(null);
  const layout = LAYOUT[theme];

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (win.maximized || event.button !== 0) return;
    drag.current = { dx: event.clientX - win.x, dy: event.clientY - win.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    const x = Math.min(Math.max(event.clientX - drag.current.dx, layout.left + 80 - win.w), window.innerWidth - 80);
    const y = Math.min(Math.max(event.clientY - drag.current.dy, layout.top), window.innerHeight - 60);
    onMove(x, y);
  }

  function endDrag(event: React.PointerEvent<HTMLDivElement>) {
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  const style = win.maximized
    ? {
        left: layout.left,
        top: layout.top,
        width: `calc(100vw - ${layout.left}px)`,
        height: `calc(100vh - ${layout.top + layout.bottom}px)`,
        zIndex: win.z,
      }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  const stop = (event: React.PointerEvent) => event.stopPropagation();
  const ubuntu = theme === 'ubuntu';

  return (
    <div
      role="dialog"
      aria-label={title}
      className={`absolute flex flex-col overflow-hidden rounded-xl border text-white shadow-2xl transition-[opacity,transform] duration-200 ${
        ubuntu ? 'border-black/40 bg-[#242424]' : 'border-white/10 bg-[#1c1c1e]'
      } ${active ? 'shadow-black/70 ring-1 ring-white/30' : 'shadow-black/30'} ${
        win.minimized ? 'pointer-events-none scale-75 opacity-0' : 'scale-100'
      }`}
      style={style}
      onPointerDown={onFocus}
    >
      <div
        className={`flex h-9 shrink-0 cursor-default select-none items-center border-b px-3 ${
          ubuntu ? 'border-black/30 bg-[#303030]' : 'border-white/10 bg-[#2b2b2d]'
        }`}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onDoubleClick={onToggleMaximize}
      >
        {ubuntu ? (
          <>
            <div className="w-[84px] shrink-0" />
            <span className={`flex-1 truncate text-center text-[13px] font-semibold ${active ? 'text-white/90' : 'text-white/45'}`}>
              {title}
            </span>
            <div className="flex w-[84px] shrink-0 justify-end gap-1.5">
              <button
                aria-label="Minimize"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
                onPointerDown={stop}
                onClick={onMinimize}
              >
                <svg {...iconProps}>
                  <path d="M2.5 9h7" />
                </svg>
              </button>
              <button
                aria-label="Maximize"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
                onPointerDown={stop}
                onClick={onToggleMaximize}
              >
                <svg {...iconProps}>
                  <rect x="2.5" y="2.5" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                aria-label="Close"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-[#e95420] hover:text-white"
                onPointerDown={stop}
                onClick={onClose}
              >
                <svg {...iconProps}>
                  <path d="M3 3l6 6M9 3l-6 6" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <button
                aria-label="Close"
                className="h-3 w-3 rounded-full bg-[#ff5f57] hover:brightness-110"
                onPointerDown={stop}
                onClick={onClose}
              />
              <button
                aria-label="Minimize"
                className="h-3 w-3 rounded-full bg-[#febc2e] hover:brightness-110"
                onPointerDown={stop}
                onClick={onMinimize}
              />
              <button
                aria-label="Maximize"
                className="h-3 w-3 rounded-full bg-[#28c840] hover:brightness-110"
                onPointerDown={stop}
                onClick={onToggleMaximize}
              />
            </div>
            <span className={`mx-auto -translate-x-6 text-[13px] ${active ? 'text-white/80' : 'text-white/40'}`}>
              {title}
            </span>
          </>
        )}
      </div>
      {/* colorScheme dark gives the scrollbars a dark look instead of the bright default */}
      <div className="min-h-0 flex-1 overflow-auto" style={{ colorScheme: 'dark' }}>
        {children}
      </div>
      {/* Dims windows that are not in front, so the active one stands out. Clicks pass through. */}
      {!active && <div className="pointer-events-none absolute inset-x-0 bottom-0 top-9 bg-black/45" />}
    </div>
  );
}
