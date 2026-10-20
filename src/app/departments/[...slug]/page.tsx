import Link from "next/link";
import { notFound } from "next/navigation";
import { departments, specializations, students, getSpecialization } from "@/lib/data";
import StudentCard from "@/components/StudentCard";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function DepartmentSlugPage({ params }: Props) {
  const resolvedParams = await params;
  const slugSegments = resolvedParams.slug;

  if (!slugSegments || slugSegments.length === 0 || slugSegments.length > 2) {
    notFound();
  }

  const deptSlug = slugSegments[0];
  const department = departments.find((d) => d.slug.toLowerCase() === deptSlug.toLowerCase());

  if (!department) {
    notFound();
  }

  // CASE 1: Department Overview (/departments/[deptSlug])
  if (slugSegments.length === 1) {
    const deptSpecializations = specializations.filter(
      (s) => s.departmentSlug.toLowerCase() === department.slug.toLowerCase()
    );
    const deptStudents = students.filter(
      (s) => s.departmentSlug.toLowerCase() === department.slug.toLowerCase()
    );

    return (
      <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
          {/* Breadcrumbs */}
          <div className="mb-4">
            <Breadcrumbs
              items={[
                { label: "Departments", href: "/departments" },
                { label: department.name },
              ]}
            />
          </div>

          {/* Back button */}
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Return to all departments</span>
          </Link>

          {/* Department Overview Banner */}
          <section className="mt-6 rounded-xl border border-[#1e293b] bg-[#101726] p-6 shadow-xl sm:p-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div>
                <span className="rounded border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-semibold text-blue-300">
                  Academic Faculty
                </span>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {department.name}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-300">
                  {department.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2 rounded-lg border border-[#23314d] bg-[#0c1220] p-4 text-xs font-medium text-slate-300 sm:text-right">
                <div>
                  <span className="text-slate-500">Curriculum Cycle: </span>
                  <span className="text-slate-200">2024–2025</span>
                </div>
                <div>
                  <span className="text-slate-500">Track Offerings: </span>
                  <span className="text-blue-400">{deptSpecializations.length} Specializations</span>
                </div>
                <div>
                  <span className="text-slate-500">Total Enrolled: </span>
                  <span className="text-emerald-400">{deptStudents.length} Students</span>
                </div>
              </div>
            </div>
          </section>

          {/* Specializations / Tracks Grid */}
          <section className="mt-10">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
              <h2 className="text-xl font-bold text-white">
                Academic Specializations & Tracks ({deptSpecializations.length})
              </h2>
              <span className="text-xs text-slate-400">Select a specialization to view enrollees</span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deptSpecializations.map((spec) => (
                <Link
                  key={spec.slug}
                  href={`/departments/${department.slug}/${spec.slug}`}
                  className="group rounded-lg border border-[#1e293b] bg-[#101726] p-5 shadow-sm transition-all duration-200 hover:border-blue-500/50 hover:bg-[#131b2e] hover:shadow-lg hover:shadow-black/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded border border-[#23314d] bg-[#141d30] px-2 py-0.5 font-mono text-xs font-semibold text-slate-400">
                      {spec.code}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{spec.cycle}</span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {spec.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
                    {spec.description}
                  </p>

                  <div className="mt-4 border-t border-[#1e293b] pt-3 text-xs text-slate-500">
                    <p>Lead: <span className="text-slate-300">{spec.lead}</span></p>
                    <p className="mt-1">Core Lab: <span className="text-slate-300">{spec.lab}</span></p>
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    <span>View track details</span>
                    <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Department Students Preview */}
          <section className="mt-12">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
              <h2 className="text-xl font-bold text-white">
                Students in {department.name} ({deptStudents.length})
              </h2>
              <Link
                href="/students"
                className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline"
              >
                Browse directory →
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {deptStudents.slice(0, 6).map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </section>
        </main>

      </div>
    );
  }

  // CASE 2: Specialization Detail (/departments/[deptSlug]/[specSlug]) - Matches Screen 4
  const specSlug = slugSegments[1];
  const specialization = getSpecialization(deptSlug, specSlug);

  if (!specialization) {
    notFound();
  }

  // Enrolled students in this specialization
  const enrolledStudents = students.filter(
    (s) =>
      s.departmentSlug.toLowerCase() === department.slug.toLowerCase() &&
      s.specialization.toLowerCase() === specialization.name.toLowerCase()
  );

  const activeEnrolledCount = enrolledStudents.filter(
    (s) => s.status === "Active"
  ).length;

  const stats = [
    { label: "Academic Lead", value: specialization.lead },
    { label: "Primary Core Lab", value: specialization.lab },
    { label: "Total Enrollment", value: `${activeEnrolledCount || enrolledStudents.length} Active Enrollees` },
    { label: "Curriculum Cycle", value: specialization.cycle },
  ];

  const fullPath = `/departments/${department.slug}/${specialization.slug}`;

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-8">
        {/* Breadcrumb Navigation - matches Screen 4 */}
        <div className="mb-6">
          <Breadcrumbs
            items={[
              { label: "Departments", href: "/departments" },
              { label: department.name, href: `/departments/${department.slug}` },
              { label: specialization.name },
            ]}
          />
        </div>

        {/* Action Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e293b] pb-5">
          <Link
            href={`/departments/${department.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Return to {department.name} Department</span>
          </Link>

          <Link
            href="/students"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>View all students</span>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Specialization Banner Card */}
        <section className="mt-8 rounded-xl border border-[#1e293b] bg-[#101726] p-6 shadow-xl sm:p-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {specialization.name}
                </h1>
                <span className="rounded border border-[#23314d] bg-[#141d30] px-3 py-1 text-xs font-semibold text-slate-300">
                  Specialization under {department.name}
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                {specialization.description}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Department Track
              </p>
              <p className="mt-2 inline-block rounded border border-blue-500/30 bg-blue-500/10 px-4 py-2 font-mono text-base font-bold text-blue-300 shadow-sm">
                {specialization.code}
              </p>
            </div>
          </div>

          <hr className="my-7 border-[#1e293b]" />

          {/* Stats Grid */}
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </dt>
                <dd className="mt-1 text-base font-medium text-slate-200">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Students in this Specialization */}
        <section className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-4">
            <h2 className="flex items-center gap-3 text-xl font-bold text-white sm:text-2xl">
              <span>Students in this Specialization</span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                {enrolledStudents.length}
              </span>
            </h2>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Filtered by Track:</span>
              <span className="rounded border border-[#23314d] bg-[#141d30] px-2.5 py-1 font-medium text-slate-300">
                {specialization.name}
              </span>
            </div>
          </div>

          {enrolledStudents.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-[#1e293b] bg-[#101726]/40 p-10 text-center text-slate-400">
              <p>No students are currently assigned to this specialization track.</p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
              {enrolledStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  variant="specialization"
                />
              ))}
            </div>
          )}
        </section>
      </main>

    </div>
  );
}
