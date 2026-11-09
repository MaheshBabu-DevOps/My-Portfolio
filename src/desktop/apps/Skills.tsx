'use client';
import { skillsSection } from '@/lib/content/skills';

export default function Skills() {
  return (
    <div className="space-y-6 p-6">
      {skillsSection.skills.map((group) => (
        <section key={group.title}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">{group.title}</h2>
          <div className="flex flex-wrap gap-2">
            {group.softwareSkills.map((skill) => (
              <span
                key={skill.name}
                className="rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-white/90"
              >
                {skill.name}
              </span>
            ))}
          </div>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-white/70">
            {group.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
