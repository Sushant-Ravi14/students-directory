import Link from "next/link";
import { notFound } from "next/navigation";
import { students } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  params: Promise<{ id: string }>;
};

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

function getYearClassification(year: number) {
  switch (year) {
    case 1:
      return "1st Year (Freshman)";
    case 2:
      return "2nd Year (Sophomore)";
    case 3:
      return "3rd Year (Junior)";
    case 4:
      return "4th Year (Senior)";
    default:
      return `${year}th Year Undergraduate`;
  }
}

export default async function StudentProfilePage({ params }: Props) {
  const { id } = await params;

  // Case-insensitive ID lookup
  const student = students.find(
    (item) => item.id.toLowerCase() === id.toLowerCase()
  );

  if (!student) {
    notFound();
  }

  const initials = getInitials(student.name);
  const avatarClass = getAvatarStyle(student.id);
  const initialsCode = student.name
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  const deptCode = student.departmentSlug.split("-")[0]?.toUpperCase() || "AC";
  const recordId = `0948-${deptCode}-${initialsCode}`;

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "Students", href: "/students" },
              { label: student.name },
            ]}
          />
        </div>

        {/* Back Button */}
        <Link
          href="/students"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back to students</span>
        </Link>

        {/* Main Profile Card */}
        <div className="mt-6 rounded-xl border border-[#1e293b] bg-[#101726] p-6 shadow-xl sm:p-8">
          {/* Top Profile Header */}
          <div className="flex flex-wrap items-center gap-5">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-xl font-bold tracking-wider ${avatarClass}`}
            >
              {initials}
            </div>

            <div className="space-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {student.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded border border-[#23314d] bg-[#141d30] px-2.5 py-0.5 font-mono text-xs font-semibold text-slate-300">
                  {student.id}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {student.status || "Active Student"}
                </span>
              </div>
            </div>
          </div>

          <hr className="my-7 border-[#1e293b]" />

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Department
              </p>
              <p className="mt-1 font-medium text-slate-200">
                {student.department}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Study Year
              </p>
              <p className="mt-1 font-medium text-slate-200">
                {getYearClassification(student.year)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Email
              </p>
              <a
                href={`mailto:${student.email}`}
                className="mt-1 block font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors break-all"
              >
                {student.email}
              </a>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Enrolled
              </p>
              <p className="mt-1 font-medium text-slate-200">
                {student.enrolled}
              </p>
            </div>
          </div>

          <hr className="my-7 border-[#1e293b]" />

          {/* About Section */}
          <section>
            <h2 className="text-lg font-semibold text-white">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {student.about || "Undergraduate student pursuing advanced coursework and practical research."}
            </p>
          </section>

          <hr className="my-7 border-[#1e293b]" />

          {/* Academic Details Section */}
          <section>
            <h2 className="text-lg font-semibold text-white">Academic Details</h2>

            <div className="mt-4 divide-y divide-[#1e293b]">
              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-slate-400">Department</span>
                <span className="font-medium text-slate-200">{student.department}</span>
              </div>

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-slate-400">Current Academic Standing</span>
                <span className="font-medium text-slate-200">
                  {student.year}rd Year Undergraduate
                </span>
              </div>

              {student.specialization && (
                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="text-slate-400">Declared Specialization</span>
                  <Link
                    href={`/departments/${student.departmentSlug}/${student.specialization.toLowerCase().replace(/\s+/g, "-")}`}
                    className="font-medium text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {student.specialization} →
                  </Link>
                </div>
              )}
            </div>

            {/* Enrolled Subjects Box */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Enrolled Subjects
              </p>

              {student.subjects && student.subjects.length > 0 ? (
                <div className="mt-3 overflow-hidden rounded-lg border border-[#1e293b] bg-[#0c1220]">
                  <ul className="divide-y divide-[#1e293b]">
                    {student.subjects.map((sub) => (
                      <li
                        key={sub.code}
                        className="flex flex-col justify-between gap-1 px-4 py-3 sm:flex-row sm:items-center"
                      >
                        <p className="text-sm text-slate-200">
                          <span className="font-semibold text-blue-400">{sub.code}</span>
                          <span className="mx-2 text-slate-600">:</span>
                          <span>{sub.name}</span>
                        </p>
                        <span className="shrink-0 text-xs font-medium text-slate-400">
                          {sub.credits.toFixed(1)} Credits
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  No registered subjects for this semester.
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Record Meta Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500">
          <span>System Record ID: {recordId}</span>
          <span>Last validated: Oct 24, 2024</span>
        </div>
      </main>


    </div>
  );
}
