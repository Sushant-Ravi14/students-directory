import { departments } from "@/lib/data";
import DepartmentCard from "@/components/DepartmentCard";

export default function DepartmentsPage() {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Departments
          </h1>
          <p className="mt-2 text-base text-slate-400">
            Explore academic faculties, programs, and enrolled students.
          </p>
        </header>

        <hr className="my-8 border-[#1e293b]" />

        {/* Departments List Container */}
        <section className="overflow-hidden rounded-xl border border-[#1e293b] bg-[#101726] divide-y divide-[#1e293b] shadow-xl">
          {departments.map((department) => (
            <DepartmentCard key={department.slug} department={department} />
          ))}
        </section>

        {/* Footer info line */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-slate-500">
          <p>Curriculum Year 2024–2025</p>
          <p>Updated daily via Student Records API</p>
        </div>
      </main>
    </div>
  );
}