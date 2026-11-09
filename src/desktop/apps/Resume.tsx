'use client';
import { resumeFileName } from '@/lib/utils/config';

export default function Resume() {
  return (
    <div className="flex h-full min-h-[420px] flex-col">
      <div className="flex items-center justify-end gap-3 border-b border-white/10 bg-[#242426] px-3 py-1.5 text-xs">
        <a className="rounded bg-white/10 px-2 py-1 hover:bg-white/20" href={`/${resumeFileName}`} download>
          Download PDF
        </a>
      </div>
      <iframe title="Resume" src={`/${resumeFileName}`} className="min-h-0 flex-1 bg-white" />
    </div>
  );
}
