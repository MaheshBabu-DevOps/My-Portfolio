import { AppId } from './types';

// Original icon designs (simple shapes on a gradient tile), not copied from any operating system.
const gradients: Record<AppId, string> = {
  terminal: 'linear-gradient(145deg,#3a3a3c,#0b0b0c)',
  finder: 'linear-gradient(145deg,#5ec8ff,#1b6fd8)',
  about: 'linear-gradient(145deg,#ffc371,#f0702a)',
  experience: 'linear-gradient(145deg,#8be28f,#2c8a3e)',
  skills: 'linear-gradient(145deg,#b4b8c2,#5b606b)',
  education: 'linear-gradient(145deg,#cf7ce8,#6b2fb0)',
  mail: 'linear-gradient(145deg,#6ee0f0,#0a74c9)',
  resume: 'linear-gradient(145deg,#ff7b72,#b3261e)',
};

const glyphs: Record<AppId, JSX.Element> = {
  terminal: (
    <>
      <path d="M5 8l4 4-4 4" />
      <path d="M12 17h7" />
    </>
  ),
  finder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  about: (
    <>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
    </>
  ),
  experience: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2" />
      <path d="M4 13h16" />
    </>
  ),
  skills: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
  education: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </>
  ),
  resume: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
};

export function AppIcon({
  id,
  size = 52,
  rounded = 'rounded-[22%]',
}: {
  id: AppId;
  size?: number;
  rounded?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center shadow-lg ring-1 ring-white/20 ${rounded}`}
      style={{ width: size, height: size, background: gradients[id] }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.55}
        height={size * 0.55}
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyphs[id]}
      </svg>
    </div>
  );
}
