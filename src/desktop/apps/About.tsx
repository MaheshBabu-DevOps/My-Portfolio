'use client';
import { heroSection } from '@/lib/content/hero';
import { author, socialLinks } from '@/lib/content/portfolio';

export default function About() {
  return (
    <div className="flex flex-col gap-5 p-6 sm:flex-row">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mypic.jpg"
        alt={author.name}
        className="h-40 w-40 shrink-0 rounded-2xl object-cover shadow-lg ring-1 ring-white/20"
      />
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{author.name}</h1>
        <p className="text-sky-300">AWS DevOps Engineer · Bangalore, India</p>
        <p className="text-sm leading-relaxed text-white/80">{heroSection.description}</p>
        <p className="text-sm leading-relaxed text-white/80">
          I have worked across robotics industrial automation and defense, building CI/CD pipelines,
          running Kubernetes on AWS EKS and automating cloud infrastructure, including air-gapped
          (offline) environments. Open to full-time DevOps roles (remote, hybrid or onsite) and
          freelance projects.
        </p>
        <div className="flex flex-wrap gap-2 pt-1 text-sm">
          <a
            className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20"
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20"
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/20" href={`mailto:${author.email}`}>
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
