'use client';
import { experienceSection } from '@/lib/content/experience';

import { useState } from 'react';

export default function Experience() {
  const [selected, setSelected] = useState(0);
  const job = experienceSection.experiences[selected];

  return (
    <div className="flex h-full min-h-[360px]">
      <ul className="w-52 shrink-0 space-y-1 border-r border-white/10 bg-[#242426] p-2 text-sm">
        {experienceSection.experiences.map((item, index) => (
          <li key={`${item.company}-${item.started}`}>
            <button
              onClick={() => setSelected(index)}
              className={`w-full rounded-lg px-3 py-2 text-left ${
                index === selected ? 'bg-amber-500/30 text-white' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <span className="block font-medium">{item.company}</span>
              <span className="block text-xs text-white/50">
                {String(item.started)} - {String(item.upto)}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex-1 space-y-3 overflow-auto p-5">
        <div>
          <h2 className="text-lg font-semibold">{job.role}</h2>
          <p className="text-sm text-sky-300">
            {job.company}
            {job.client ? ` · Client: ${job.client}` : ''}
          </p>
          <p className="text-xs text-white/50">
            {String(job.started)} - {String(job.upto)}
          </p>
        </div>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/80">
          {job.tasks.map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
