'use client';
import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
};

/**
 * Mouse follower: a large soft glow plus a small trailing "bubble" ring.
 * Positions are eased in a rAF loop and written straight to the DOM,
 * so moving the mouse never triggers a React re-render.
 */
const Cursor = ({ className = '' }: Props) => {
  const glowRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const glow = { ...target };
    const bubble = { ...target };
    let frame = 0;

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      // Different easing speeds give the trailing, bubbly feel
      glow.x += (target.x - glow.x) * 0.08;
      glow.y += (target.y - glow.y) * 0.08;
      bubble.x += (target.x - bubble.x) * 0.3;
      bubble.y += (target.y - bubble.y) * 0.3;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%)`;
      }
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMouseMove);
    frame = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div
        ref={glowRef}
        className="fixed top-0 left-0 z-30 w-[420px] h-[420px] rounded-full will-change-transform"
        style={{
          background:
            'radial-gradient(closest-side, rgb(56 189 248 / 0.10) 0%, rgb(99 102 241 / 0.05) 45%, transparent 100%)',
        }}
      />
      <div
        ref={bubbleRef}
        className="fixed top-0 left-0 z-30 w-3 h-3 rounded-full border border-sky-300/50 will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgb(255 255 255 / 0.25), rgb(56 189 248 / 0.10) 70%, transparent)',
          boxShadow: '0 0 8px rgb(56 189 248 / 0.30)',
        }}
      />
    </div>
  );
};

export default Cursor;
