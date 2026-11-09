'use client';
import { projectsSection } from '@/lib/content/projects';

import { useState } from 'react';

export default function Finder() {
  const [selected, setSelected] = useState(0);
  const projects = projectsSection.projects;
  const current = projects[selected];

  return (
    <div className="flex h-full min-h-[360px]">
      <ul className="w-56 shrink-0 space-y-1 border-r border-white/10 bg-[#242426] p-2 text-sm">
        <li className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-white/40">Projects</li>
        {projects.map((project, index) => (
          <li key={project.id}>
            <button
              onClick={() => setSelected(index)}
              className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left ${
                index === selected ? 'bg-sky-500/40 text-white' : 'text-white/75 hover:bg-white/10'
              }`}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#5ec8ff" aria-hidden="true">
                <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span className="truncate">{project.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex-1 space-y-4 overflow-auto p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.img} alt={current.name} className="w-full max-w-md rounded-xl border border-white/10" />
        <div>
          <h2 className="text-lg font-semibold">{current.name}</h2>
          <p className="text-xs text-white/50">{current.year}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {current.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-sky-500/20 px-2 py-1 font-mono text-xs text-sky-300">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={current.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
        >
          Open on GitHub
        </a>
      </div>
    </div>
  );
}
