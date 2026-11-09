'use client';
import { heroSection } from '@/lib/content/hero';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { SHOW_PROJECTS } from '@/lib/utils/config';
import { getBreakpointsWidth } from '@/lib/utils/helper';

import { Wrapper } from '@/components';
import DevOpsLogo from '@/components/ui/DevOpsLogo';
import TerminalAnimation from '@/components/ui/TerminalAnimation';

import { slideUp } from '@/styles/animations';

import { motion } from 'framer-motion';

const stats = [
  { value: '4+ Years', label: 'Total experience' },
  {
    value: '2 Industries',
    label: 'Robotics Industrial Automation and Defense sectors',
  },
  {
    value: 'Air-gapped',
    label: 'Offline CI/CD environments',
  },
];

const Hero = () => {
  const { subtitle, title, tagline, description } = heroSection;

  const windowWidth = useWindowWidth();
  const md = getBreakpointsWidth('md');
  const DEFAULT_ANIMATION_DELAY = windowWidth <= md ? 0.9 : 1.7;

  const getAnimationDelay = (i: number, increment = 0.15) =>
    DEFAULT_ANIMATION_DELAY + increment * i;

  return (
    <Wrapper
      id="hero"
      className="grid items-center h-full min-h-screen gap-12 mt-12 lg:grid-cols-[1.15fr_1fr] xs:mt-0"
    >
      <div className="flex flex-col gap-6">
        <div className="max-w-5xl text-4xl font-bold tracking-tighter md:text-6xl">
          <motion.p
            variants={slideUp({ delay: getAnimationDelay(1) })}
            initial="hidden"
            animate="show"
            className="mb-3 font-mono text-sm font-normal tracking-normal md:text-base text-accent"
          >
            {subtitle}
          </motion.p>
          <motion.h1
            variants={slideUp({ delay: getAnimationDelay(1) })}
            initial="hidden"
            animate="show"
            className="text-slate-900 dark:text-slate-100 capitalize mb-2 leading-[1.1]"
          >
            {title}
          </motion.h1>
          <motion.h2
            variants={slideUp({ delay: getAnimationDelay(2) })}
            initial="hidden"
            animate="show"
            className="leading-[1.2] bg-gradient-to-r from-sky-400 via-indigo-400 to-teal-300 bg-clip-text text-transparent"
          >
            {tagline}
          </motion.h2>
        </div>

        <motion.p
          variants={slideUp({ delay: getAnimationDelay(3) })}
          initial="hidden"
          animate="show"
          className="max-w-xl text-base md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          variants={slideUp({ delay: getAnimationDelay(4) })}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center gap-3 mt-2"
        >
          <a
            href={SHOW_PROJECTS ? '#projects' : '#experience'}
            data-magnetic
            className="px-6 py-3 text-sm font-medium transition-all rounded-md bg-accent text-slate-900 hover:brightness-110 hover:-translate-y-0.5"
          >
            {SHOW_PROJECTS ? 'View my work' : 'View my experience'}
          </a>
          <a
            href="#contact"
            data-magnetic
            className="px-6 py-3 text-sm font-medium transition-all border rounded-md border-accent text-accent hover:bg-accent-light hover:-translate-y-0.5"
          >
            Get in touch
          </a>
          <a
            href="/desktop"
            className="hidden px-2 py-3 text-sm font-medium transition-colors md:inline-block text-dark-2 hover:text-accent"
          >
            Desktop view ↗
          </a>
        </motion.div>

        <motion.dl
          variants={slideUp({ delay: getAnimationDelay(5) })}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t max-w-xl border-slate-500/20"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-base font-semibold sm:text-lg text-dark-1">{s.value}</dt>
              <dd className="text-xs">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        variants={slideUp({ delay: getAnimationDelay(3) })}
        initial="hidden"
        animate="show"
        className="hidden lg:block"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-8">
          <DevOpsLogo />
          <div className="w-full">
            <TerminalAnimation />
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
};

export default Hero;
