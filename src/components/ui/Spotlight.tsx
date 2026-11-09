'use client';
import { useEffect } from 'react';

const MAGNET_PULL = 0.25; // how far a button leans toward the mouse (fraction of the distance)
const MAGNET_MAX = 10; // never move more than this many pixels

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

/**
 * Two small hover effects, driven by one mouse listener (no re-renders, no extra library):
 *  - [data-spotlight]: sets --mx/--my so the CSS in globals.css can draw a soft light that
 *    follows the mouse inside that card.
 *  - [data-magnetic]: the element leans a few pixels toward the mouse.
 * Both are skipped on touch screens and for visitors who ask for reduced motion.
 */
const Spotlight = () => {
  useEffect(() => {
    const fineMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fineMouse || reduceMotion) return;

    let magnet: HTMLElement | null = null;

    const resetMagnet = () => {
      if (!magnet) return;
      magnet.style.translate = '';
      delete magnet.dataset.tx;
      delete magnet.dataset.ty;
      magnet = null;
    };

    const onMove = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;

      const card = target?.closest<HTMLElement>('[data-spotlight]');
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - box.left}px`);
        card.style.setProperty('--my', `${event.clientY - box.top}px`);
      }

      const next = target?.closest<HTMLElement>('[data-magnetic]') ?? null;
      if (next !== magnet) resetMagnet();
      if (next) {
        magnet = next;
        const box = next.getBoundingClientRect();
        // Remove the current offset so the button's own movement does not feed back into the maths.
        const centerX = box.left + box.width / 2 - Number(next.dataset.tx ?? 0);
        const centerY = box.top + box.height / 2 - Number(next.dataset.ty ?? 0);
        const dx = clamp((event.clientX - centerX) * MAGNET_PULL, MAGNET_MAX);
        const dy = clamp((event.clientY - centerY) * MAGNET_PULL, MAGNET_MAX);
        next.dataset.tx = String(dx);
        next.dataset.ty = String(dy);
        next.style.translate = `${dx}px ${dy}px`;
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', resetMagnet);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', resetMagnet);
      resetMagnet();
    };
  }, []);

  return null;
};

export default Spotlight;
