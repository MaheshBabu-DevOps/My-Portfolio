'use client';
import { educationSection } from '@/lib/content/education';
import { experienceSection } from '@/lib/content/experience';
import { heroSection } from '@/lib/content/hero';
import { author, socialLinks } from '@/lib/content/portfolio';
import { projectsSection } from '@/lib/content/projects';
import { skillsSection } from '@/lib/content/skills';

import { AppContext, AppId } from '../types';
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';

type Line = { id: number; kind: 'in' | 'out'; text: string };


const APP_ALIASES: Record<string, AppId> = {
  terminal: 'terminal',
  projects: 'finder',
  finder: 'finder',
  about: 'about',
  experience: 'experience',
  skills: 'skills',
  education: 'education',
  contact: 'mail',
  mail: 'mail',
  resume: 'resume',
};

const HELP = [
  'Available commands:',
  '  about        who I am',
  '  skills       tools and technologies',
  '  experience   where I have worked',
  '  projects     my projects',
  '  education    education and certifications',
  '  contact      how to reach me',
  '  resume       open my resume',
  '  open <app>   open a window: projects, about, experience, skills, education, contact, resume',
  '  neofetch     system summary',
  '  clear        clear the screen',
  '  exit         close this terminal',
];

function runCommand(raw: string, ctx: AppContext): string[] | 'clear' {
  const [command = '', ...args] = raw.trim().split(/\s+/);
  switch (command.toLowerCase()) {
    case '':
      return [];
    case 'help':
      return HELP;
    case 'clear':
      return 'clear';
    case 'whoami':
      return [author.name];
    case 'about':
      return [`${author.name}, AWS DevOps Engineer, Bangalore, India`, '', heroSection.description ?? ''];
    case 'skills':
      return skillsSection.skills.flatMap((group) => [
        `${group.title}:`,
        `  ${group.softwareSkills.map((skill) => skill.name).join(', ')}`,
        '',
      ]);
    case 'experience':
      return experienceSection.experiences.flatMap((job) => [
        `${job.role} @ ${job.company}${job.client ? ` (client: ${job.client})` : ''}`,
        `  ${String(job.started)} - ${String(job.upto)}`,
        '',
      ]);
    case 'projects':
      return projectsSection.projects.flatMap((project, index) => [
        `${index + 1}. ${project.name} (${project.year})`,
        `   ${project.tags.join(', ')}`,
        `   ${project.repo}`,
      ]);
    case 'education':
    case 'certs':
      return [
        ...educationSection.education.flatMap((item) => [
          `${item.degree}`,
          `  ${item.school} (${item.years})`,
          '',
        ]),
        'Certifications:',
        ...educationSection.certifications.map(
          (cert) => `  ${cert.year}  ${cert.name} - ${cert.issuer}`
        ),
      ];
    case 'contact':
      return [`email:    ${author.email}`, `github:   ${socialLinks.github}`, `linkedin: ${socialLinks.linkedin}`];
    case 'resume':
      ctx.openApp('resume');
      return ['Opening resume...'];
    case 'open': {
      const target = APP_ALIASES[(args[0] ?? '').toLowerCase()];
      if (!target) return [`open: unknown app "${args[0] ?? ''}". Try: projects, about, experience, skills, education, contact, resume`];
      ctx.openApp(target);
      return [`Opening ${args[0]}...`];
    }
    case 'ls':
      return ['about  experience  skills  projects  education  contact  resume'];
    case 'date':
      return [new Date().toString()];
    case 'echo':
      return [args.join(' ')];
    case 'neofetch':
      return [
        `${author.name}@portfolio`,
        '-------------------------',
        'Role:       AWS DevOps Engineer',
        'Experience: 4+ years',
        'Cloud:      AWS (EC2, EKS, ECR, RDS, ALB)',
        'Platform:   Docker, Kubernetes, Rancher',
        'CI/CD:      Jenkins, GitHub Actions',
        'Security:   HashiCorp Vault, Trivy',
        'Monitoring: Prometheus, Grafana',
        'Location:   Bangalore, India',
      ];
    case 'exit':
      ctx.closeApp('terminal');
      return ['logout'];
    case 'sudo':
      return ['nice try. this portfolio is read-only.'];
    default:
      return [`command not found: ${command}. Type "help" to see what is available.`];
  }
}

function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/\S+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noreferrer" className="text-sky-300 underline">
          {part}
        </a>
      );
    }
    if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part)) {
      return (
        <a key={index} href={`mailto:${part}`} className="text-sky-300 underline">
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function Terminal(ctx: AppContext) {
  const prompt = ctx.theme === 'ubuntu' ? 'mahesh@portfolio:~$' : 'mahesh@portfolio ~ %';
  const nextId = useRef(1);
  const [lines, setLines] = useState<Line[]>([
    { id: 0, kind: 'out', text: `Welcome to ${author.name}'s portfolio terminal.` },
    { id: -1, kind: 'out', text: 'Type "help" to see the commands, or open an app from the dock.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  function submit() {
    const command = input;
    const result = runCommand(command, ctx);
    if (result === 'clear') {
      setLines([]);
    } else {
      const added: Line[] = [
        { id: nextId.current++, kind: 'in', text: command },
        ...result.map((text) => ({ id: nextId.current++, kind: 'out' as const, text })),
      ];
      setLines((previous) => [...previous, ...added]);
    }
    if (command.trim()) setHistory((previous) => [...previous, command]);
    setCursor(-1);
    setInput('');
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      submit();
    } else if (event.key === 'ArrowUp' && history.length) {
      event.preventDefault();
      const next = cursor === -1 ? history.length - 1 : Math.max(cursor - 1, 0);
      setCursor(next);
      setInput(history[next]);
    } else if (event.key === 'ArrowDown' && cursor !== -1) {
      event.preventDefault();
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setInput('');
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    }
  }

  return (
    <div
      className={`h-full min-h-[300px] cursor-text p-3 font-mono text-[13px] leading-relaxed text-[#c9d1d9] ${
        ctx.theme === 'ubuntu' ? 'bg-[#300a24]' : 'bg-[#0d1117]'
      }`}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line) =>
        line.kind === 'in' ? (
          <div key={line.id} className="whitespace-pre-wrap">
            <span className="text-emerald-400">{prompt}</span> {line.text}
          </div>
        ) : (
          <div key={line.id} className="whitespace-pre-wrap break-words">
            {linkify(line.text)}
          </div>
        )
      )}
      <div className="flex">
        <span className="mr-2 shrink-0 text-emerald-400">{prompt}</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={onKeyDown}
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
          className="min-w-0 flex-1 bg-transparent text-[#c9d1d9] caret-emerald-400 outline-none"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
