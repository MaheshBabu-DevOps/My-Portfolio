'use client';
import { ExperienceType } from '@/lib/types';

import { Link, ListItem } from '@/components';

import { useState } from 'react';

const VISIBLE_TASKS = 5;

type Props = {
  experiences: ExperienceType[];
};

const TimelineItem = ({
  role,
  company,
  companyUrl,
  client,
  clientUrl,
  started,
  upto,
  tasks,
  isCurrent,
}: ExperienceType & { isCurrent: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleTasks = expanded ? tasks : tasks.slice(0, VISIBLE_TASKS);
  const hiddenCount = tasks.length - VISIBLE_TASKS;

  return (
    <li className="relative pl-8 sm:pl-10">
      {/* Timeline dot */}
      <span
        className={`absolute left-0 top-2 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-accent ${
          isCurrent ? 'bg-accent' : 'bg-bg'
        }`}
      />

      <div
        data-spotlight
        className="p-5 transition-colors border rounded-xl border-dark-3 bg-bg-secondary/60 hover:border-accent/40 sm:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-medium text-dark-1">{role}</h3>
            <p className="text-sm">
              <Link href={companyUrl} target="_blank" className="text-accent">
                {company}
              </Link>
              {client && (
                <>
                  <span className="mx-2 text-dark-3">|</span>
                  <span>Client: </span>
                  {clientUrl ? (
                    <Link
                      href={clientUrl}
                      target="_blank"
                      className="text-accent"
                    >
                      {client}
                    </Link>
                  ) : (
                    client
                  )}
                </>
              )}
            </p>
          </div>
          <span className="px-3 py-1 font-mono text-xs border rounded-full whitespace-nowrap border-dark-3">
            {`${started} - ${upto}`}
          </span>
        </div>

        <ul className="mt-4 space-y-2 text-sm md:text-base">
          {visibleTasks.map((task, i) => (
            <ListItem key={i}>{task}</ListItem>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-4 font-mono text-xs text-accent hover:underline"
          >
            {expanded ? 'Show less ↑' : `Show ${hiddenCount} more ↓`}
          </button>
        )}
      </div>
    </li>
  );
};

const ExperienceTimeline = ({ experiences }: Props) => {
  return (
    <ol className="relative ml-1.5 space-y-8 border-l border-dark-3">
      {experiences.map((experience) => (
        <TimelineItem
          key={`${experience.company}-${experience.started}`}
          {...experience}
          isCurrent={String(experience.upto).toLowerCase() === 'present'}
        />
      ))}
    </ol>
  );
};

export default ExperienceTimeline;
