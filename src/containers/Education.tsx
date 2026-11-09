'use client';
import { educationSection } from '@/lib/content/education';

import { getSectionAnimation } from '../styles/animations';
import { motion } from 'framer-motion';

const Education = () => {
  const { title, education, certifications } = educationSection;
  return (
    <motion.section
      id="education"
      className="max-w-3xl py-24 mx-auto md:py-32"
      {...getSectionAnimation}
    >
      <h2 className="heading-secondary">{title}</h2>

      <div className="space-y-4">
        {education.map((item) => (
          <div
            key={item.degree}
            data-spotlight
            className="p-5 border rounded-xl border-dark-3 bg-bg-secondary/60"
          >
            <h3 className="text-lg font-medium text-dark-1">{item.degree}</h3>
            <p className="text-sm text-accent">
              {item.school}
            </p>
            <p className="font-mono text-xs">{item.years}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 mb-4 font-mono text-sm text-accent">certifications</h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li
            key={cert.name}
            data-spotlight
            className="flex items-start justify-between gap-3 p-4 border rounded-xl border-dark-3 bg-bg-secondary/60"
          >
            <div>
              <p className="text-sm font-medium text-dark-1">{cert.name}</p>
              <p className="text-xs">{cert.issuer}</p>
            </div>
            <span className="font-mono text-xs">{cert.year}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default Education;
