'use client';
import { contactSection } from '@/lib/content/contact';
import { author, socialLinks } from '@/lib/content/portfolio';

export default function Mail() {
  return (
    <div className="space-y-4 p-6">
      <h2 className="text-lg font-semibold">Get in touch</h2>
      {contactSection.paragraphs.slice(0, 1).map((paragraph) => (
        <p key={paragraph} className="text-sm leading-relaxed text-white/80">
          {paragraph}
        </p>
      ))}
      <a
        href={`mailto:${author.email}`}
        className="inline-block rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
      >
        Write an email
      </a>
      <p className="font-mono text-xs text-white/60">{author.email}</p>
      <div className="flex gap-3 pt-2 text-sm">
        <a className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20" href={socialLinks.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20" href={socialLinks.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
}
