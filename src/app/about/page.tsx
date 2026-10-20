import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function AboutPage() {
  const highlights = [
    {
      title: "Centralized Student Directory",
      description:
        "Unified academic records repository providing instant search, filtering, and detailed student profiles across all university faculties.",
      icon: (
        <svg className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: "Faculty & Curriculum Mapping",
      description:
        "Complete academic breakdown of departments, specialized tracks, curriculum cycles, primary research labs, and academic faculty leads.",
      icon: (
        <svg className="h-6 w-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      title: "App Router Architecture",
      description:
        "Engineered with modern Next.js patterns including Server Components (RSC), Dynamic Routes ([id]), and Catch-All Routes ([...slug]).",
      icon: (
        <svg className="h-6 w-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "Directory", href: "/students" },
              { label: "About" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="rounded-xl border border-[#1e293b] bg-[#101726] p-8 shadow-xl">
          <span className="rounded border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
            About Student Directory
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Academic Informatics & Records Portal
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            Student Directory is an enterprise-grade academic directory platform designed
            to connect students, faculty departments, and specialized curriculum tracks.
            The platform provides transparent access to enrollment status, credit verification,
            coursework registration, and departmental research leads.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-[#1e293b] bg-[#0c1220] p-4 text-center">
              <p className="text-2xl font-bold text-white">8</p>
              <p className="mt-1 text-xs text-slate-400">Academic Faculties</p>
            </div>
            <div className="rounded-lg border border-[#1e293b] bg-[#0c1220] p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">30+</p>
              <p className="mt-1 text-xs text-slate-400">Specialization Tracks</p>
            </div>
            <div className="rounded-lg border border-[#1e293b] bg-[#0c1220] p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">100%</p>
              <p className="mt-1 text-xs text-slate-400">Verified Active Records</p>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">System Capabilities</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {highlights.map((feat) => (
              <div
                key={feat.title}
                className="rounded-lg border border-[#1e293b] bg-[#101726] p-6 shadow-sm"
              >
                <div className="mb-4 inline-block rounded-lg border border-[#223049] bg-[#0c1220] p-3">
                  {feat.icon}
                </div>
                <h3 className="text-base font-semibold text-slate-100">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links CTA */}
        <section className="mt-10 rounded-xl border border-[#1e293b] bg-[#101726] p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-white">Explore the Directory</h2>
          <p className="mt-2 text-sm text-slate-400">
            Browse through student profiles or inspect academic faculty structures.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/students"
              className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            >
              Browse Students
            </Link>
            <Link
              href="/departments"
              className="rounded-md border border-[#23314d] bg-[#141d30] px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-[#1a253d]"
            >
              View Departments
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}
