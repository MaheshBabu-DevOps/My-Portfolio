'use client';
import { motion } from 'framer-motion';
import { MouseEvent, useEffect, useRef, useState } from 'react';

type Scene = { cmd: string; out: string[] };
type Line = { type: 'cmd' | 'out'; text: string };

// Illustrative Linux commands only: a visual flourish, not real server output.
const scenes: Scene[] = [
  {
    cmd: 'uname -a',
    out: ['Linux devops-server 6.8.0-generic #1 SMP x86_64 GNU/Linux'],
  },
  {
    cmd: 'uptime',
    out: [' 15:26:04 up 42 days, 3:11, 1 user, load average: 0.12, 0.09, 0.05'],
  },
  {
    cmd: 'df -h /',
    out: [
      'Filesystem      Size  Used Avail Use% Mounted on',
      '/dev/nvme0n1p2  100G   34G   61G  36% /',
    ],
  },
  {
    cmd: 'free -h',
    out: [
      '        total   used   free',
      'Mem:     15Gi   4.2Gi  8.9Gi',
    ],
  },
  {
    cmd: 'systemctl status nginx --no-pager',
    out: [
      '● nginx.service - A high performance web server',
      '   Active: active (running)',
    ],
  },
  {
    cmd: 'ss -tulpn | grep :443',
    out: ['tcp LISTEN 0 511 0.0.0.0:443 users:(("nginx",pid=812))'],
  },
  {
    cmd: 'ps aux --sort=-%mem | head -n 3',
    out: [
      'USER   PID %CPU %MEM COMMAND',
      'root   812  0.3  2.1 nginx: master process',
      'jenkins 1204 1.2  4.8 java -jar jenkins.war',
    ],
  },
  {
    cmd: 'journalctl -u docker -n 2 --no-pager',
    out: [
      'dockerd[701]: container started: web-app',
      'dockerd[701]: health check passed',
    ],
  },
];

const MAX_LINES = 11;
const MAX_TILT = 8; // degrees

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TerminalAnimation = () => {
  const [lines, setLines] = useState<Line[]>([]);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setLines([]);

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion) {
      const last = scenes[scenes.length - 1];
      setLines([
        { type: 'cmd', text: last.cmd },
        ...last.out.map((text) => ({ type: 'out' as const, text })),
      ]);
      return;
    }

    const run = async () => {
      let i = 0;
      while (!cancelled) {
        const scene = scenes[i % scenes.length];

        // Clear the screen when the next scene would overflow it
        setLines((prev) =>
          prev.length + scene.out.length + 1 > MAX_LINES ? [] : prev
        );
        setLines((prev) => [...prev, { type: 'cmd', text: '' }]);

        for (let c = 1; c <= scene.cmd.length; c++) {
          if (cancelled) return;
          const text = scene.cmd.slice(0, c);
          setLines((prev) => {
            const next = [...prev];
            next[next.length - 1] = { type: 'cmd', text };
            return next;
          });
          await sleep(30 + Math.random() * 45);
        }

        await sleep(350);
        for (const text of scene.out) {
          if (cancelled) return;
          setLines((prev) => [...prev, { type: 'out', text }]);
          await sleep(140);
        }

        await sleep(1700);
        i++;
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * MAX_TILT * 2, y: px * MAX_TILT * 2 });
  };

  const lastIndex = lines.length - 1;

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className="overflow-hidden border shadow-2xl rounded-xl border-slate-500/20 bg-slate-950/80 backdrop-blur"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.15s ease-out',
          boxShadow: `${-tilt.y * 2}px ${
            tilt.x * 2 + 24
          }px 60px rgb(0 0 0 / 0.45), 0 0 40px rgb(56 189 248 / 0.08)`,
        }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-500/20 bg-slate-900/80">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="ml-3 font-mono text-xs text-slate-400">
            mahesh@devops: ~
          </span>
        </div>
        <div
          className="p-5 font-mono text-[13px] leading-6 text-slate-300 h-[330px] overflow-hidden"
          aria-hidden="true"
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-all">
              {line.type === 'cmd' ? (
                <>
                  <span className="text-emerald-400">$ </span>
                  <span className="text-slate-100">{line.text}</span>
                  {i === lastIndex && (
                    <span className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse bg-slate-300" />
                  )}
                </>
              ) : (
                <span
                  className={
                    (line.text.startsWith('✔') || line.text.startsWith('●'))
                      ? 'text-emerald-400'
                      : 'text-sky-300/90'
                  }
                >
                  {line.text}
                </span>
              )}
            </div>
          ))}
          {lastIndex >= 0 && lines[lastIndex].type === 'out' && (
            <div>
              <span className="text-emerald-400">$ </span>
              <span className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse bg-slate-300" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalAnimation;
