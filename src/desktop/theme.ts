import { Theme } from './types';

// Space the desktop chrome takes up, so maximized windows and new windows stay clear of it.
export const LAYOUT: Record<Theme, { top: number; left: number; bottom: number }> = {
  mac: { top: 28, left: 0, bottom: 92 },
  ubuntu: { top: 28, left: 0, bottom: 84 },
};

export const WALLPAPER: Record<Theme, string> = {
  mac: [
    'radial-gradient(1200px 700px at 12% 8%, rgba(123,92,255,0.55), transparent 60%)',
    'radial-gradient(900px 600px at 88% 18%, rgba(255,122,92,0.5), transparent 60%)',
    'radial-gradient(1100px 700px at 50% 105%, rgba(47,209,196,0.45), transparent 60%)',
    'linear-gradient(160deg, #141a3a, #2a1f4d 50%, #3a2350)',
  ].join(', '),
  // An original wallpaper (aubergine and orange waves), drawn for this site.
  ubuntu: 'url(/wallpapers/aubergine-waves.webp) center / cover no-repeat, #2c001e',
};
