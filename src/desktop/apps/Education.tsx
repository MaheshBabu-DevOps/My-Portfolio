'use client';
import { educationSection } from '@/lib/content/education';

export default function Education() {
  return (
    <div className="space-y-6 p-6">
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">Education</h2>
        {educationSection.education.map((item) => (
          <div key={item.degree} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-medium">{item.degree}</p>
            <p className="text-sm text-sky-300">
              {item.school}
            </p>
            <p className="text-xs text-white/50">{item.years}</p>
          </div>
        ))}
      </section>
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/50">Certifications</h2>
        <ul className="space-y-2">
          {educationSection.certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div>
                <p className="text-sm font-medium">{cert.name}</p>
                <p className="text-xs text-white/60">{cert.issuer}</p>
              </div>
              <span className="text-xs text-white/50">{cert.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
