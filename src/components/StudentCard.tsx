import Link from "next/link";
import type { Student } from "@/types/allTypes";

const avatarColorPalettes = [
  "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "bg-rose-500/15 text-rose-300 border-rose-500/30",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "bg-violet-500/15 text-violet-300 border-violet-500/30",
];

function getAvatarStyle(id: string) {
  let sum = 0;
  for (const ch of id) sum += ch.charCodeAt(0);
  return avatarColorPalettes[sum % avatarColorPalettes.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatYear(year: number) {
  if (year === 1) return "1st Year";
  if (year === 2) return "2nd Year";
  if (year === 3) return "3rd Year";
  return `${year}th Year`;
}

interface StudentCardProps {
  student: Student;
  variant?: "default" | "specialization";
}

export default function StudentCard({ student, variant = "default" }: StudentCardProps) {
  const initials = getInitials(student.name);
  const avatarClass = getAvatarStyle(student.id);

  if (variant === "specialization") {
    return (
      <article className="group relative rounded-lg border border-[#1e293b] bg-[#101726] p-5 shadow-sm transition-all duration-200 hover:border-blue-500/40 hover:bg-[#131b2e] hover:shadow-lg hover:shadow-black/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border text-sm font-bold tracking-wider ${avatarClass}`}
            >
              {initials}
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                {student.name}
              </h3>
              <p className="font-mono text-xs text-slate-400 mt-0.5">{student.id}</p>
            </div>
          </div>
          <span className="rounded border border-[#23314d] bg-[#141d30] px-2.5 py-1 text-xs font-medium text-slate-300">
            Year {student.year}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#1e293b] pt-3.5">
          <span className="text-xs text-slate-400 truncate max-w-[180px]">
            {student.specialization || student.department}
          </span>
          <Link
            href={`/students/${student.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View profile</span>
            <svg
              className="transition-transform group-hover:translate-x-0.5"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between rounded-lg border border-[#1e293b] bg-[#101726] p-6 shadow-sm transition-all duration-200 hover:border-blue-500/40 hover:bg-[#131b2e] hover:shadow-lg hover:shadow-black/30">
      <div>
        <div className="flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl border text-base font-bold tracking-wider ${avatarClass}`}
          >
            {initials}
          </div>
          <span className="rounded border border-[#23314d] bg-[#141d30] px-2.5 py-1 font-mono text-xs font-semibold text-slate-400">
            {student.id}
          </span>
        </div>

        <h2 className="mt-5 text-lg font-bold text-slate-100 group-hover:text-blue-300 transition-colors">
          {student.name}
        </h2>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-300">
            {student.department}
          </span>
          <span className="text-xs text-slate-400">{formatYear(student.year)}</span>
        </div>
      </div>

      <div className="mt-6 border-t border-[#1e293b] pt-4">
        <Link
          href={`/students/${student.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>View profile</span>
          <svg
            className="transition-transform group-hover:translate-x-1"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}