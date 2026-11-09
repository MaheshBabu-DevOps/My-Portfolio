'use client';
import ClientIcon from '@/components/icons/ClientIcon';

import { motion, useReducedMotion } from 'framer-motion';

const LAYERS = 7; // stacked copies give the loop a solid body while it turns
const DEPTH_STEP = 1.2; // px between layers

const INFINITY_PATH =
  'M100 50 C 100 50, 70 10, 45 10 C 20 10, 10 30, 10 50 C 10 70, 20 90, 45 90 C 70 90, 100 50, 100 50 ' +
  'C 100 50, 130 10, 155 10 C 180 10, 190 30, 190 50 C 190 70, 180 90, 155 90 C 130 90, 100 50, 100 50 Z';

type TileProps = {
  icon: string;
  className: string;
  gradient: string;
  rotate: number;
  delay: number;
  reduceMotion: boolean | null;
};

/** A tilted app-style tile that floats gently */
const Tile = ({
  icon,
  className,
  gradient,
  rotate,
  delay,
  reduceMotion,
}: TileProps) => (
  <motion.div
    className={`absolute z-20 flex items-center justify-center w-12 h-12 rounded-xl text-white shadow-lg ring-4 ring-black/30 ${gradient} ${className}`}
    style={{ rotate }}
    animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    <ClientIcon icon={icon} width={26} height={26} />
  </motion.div>
);

/**
 * "DevOps" emblem: a neon green infinity loop on a glass card, with floating
 * Git / Docker / AWS tiles and slowly turning gears. The loop turns a full
 * 360° around its vertical axis. Pure SVG + CSS, no image asset needed.
 */
const DevOpsLogo = () => {
  const reduceMotion = useReducedMotion();
  const mid = (LAYERS - 1) / 2;

  return (
    <div
      className="mx-auto w-[210px] h-[147px]"
      role="img"
      aria-label="DevOps: Git, Docker and AWS"
    >
      {/* Drawn at 300x210, scaled to 70% so the layout box matches */}
      <div
        className="relative w-[300px] h-[210px] origin-top-left"
        style={{ transform: 'scale(0.7)' }}
      >
        {/* Gears behind the card */}
        <motion.div
          className="absolute z-0 -right-6 top-2 text-green-500/30"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <ClientIcon icon="ph:gear-six-fill" width={88} height={88} />
        </motion.div>
        <motion.div
          className="absolute z-0 -left-8 bottom-0 text-green-500/30"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <ClientIcon icon="ph:gear-six-fill" width={100} height={100} />
        </motion.div>

        {/* Glass card */}
        <div className="absolute inset-x-5 inset-y-3 z-10 flex flex-col items-center justify-between px-4 pt-4 pb-3 overflow-hidden border rounded-xl border-green-400/50 bg-gradient-to-br from-green-900/50 to-green-950/70 backdrop-blur shadow-[0_0_35px_rgba(74,222,128,0.18)]">
          <span className="text-xl font-semibold tracking-tight text-white">
            DevOps
          </span>

          <div style={{ perspective: 700 }} className="w-full">
            <motion.div
              className="relative h-[78px] mx-auto w-[156px]"
              animate={reduceMotion ? undefined : { rotateY: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              style={{
                transformStyle: 'preserve-3d',
                filter: 'drop-shadow(0 0 7px rgba(74, 222, 128, 0.85))',
              }}
            >
              {Array.from({ length: LAYERS }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 200 100"
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: `translateZ(${(i - mid) * DEPTH_STEP}px)`,
                  }}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Bright outer rails */}
                  <path d={INFINITY_PATH} stroke="#86efac" strokeWidth="13" />
                  {/* Dark channel between the rails */}
                  <path d={INFINITY_PATH} stroke="#053b1c" strokeWidth="6" />
                </svg>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Floating tool tiles */}
        <Tile
          icon="simple-icons:git"
          className="-left-1 -top-2"
          gradient="bg-gradient-to-br from-red-500 to-red-700"
          rotate={-10}
          delay={0}
          reduceMotion={reduceMotion}
        />
        <Tile
          icon="simple-icons:docker"
          className="left-6 -bottom-3"
          gradient="bg-gradient-to-br from-sky-500 to-blue-700"
          rotate={-8}
          delay={1.2}
          reduceMotion={reduceMotion}
        />
        <Tile
          icon="simple-icons:amazonaws"
          className="-right-1 -bottom-2"
          gradient="bg-gradient-to-br from-orange-400 to-amber-600"
          rotate={9}
          delay={2.4}
          reduceMotion={reduceMotion}
        />
      </div>
    </div>
  );
};

export default DevOpsLogo;
