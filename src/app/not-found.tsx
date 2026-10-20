import Link from "next/link";

export default function NotFound() {
  const suggestedRoutes = [
    {
      label: "Students Directory",
      path: "/students",
      description: "Search and filter all registered students",
    },
    {
      label: "All Departments",
      path: "/departments",
      description: "Explore all active faculties and programs",
    },
    {
      label: "Computer Science Department",
      path: "/departments/computer-science",
      description: "Faculty overview and specialization tracks",
    },
    {
      label: "Web Development Track",
      path: "/departments/computer-science/web-development",
      description: "Active specialization enrollees and curriculum",
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      {/* Subheader Breadcrumb */}
      <header className="border-b border-[#1e293b] bg-[#0c1220]/80">
        <div className="mx-auto max-w-6xl px-6 py-3.5 text-xs text-slate-400">
          <Link href="/students" className="hover:text-blue-400 transition-colors">
            Directory
          </Link>
          <span className="mx-2 text-slate-600">/</span>
          <span className="font-semibold text-slate-200">Not Found</span>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-6 py-16 text-center sm:py-24">
        {/* Status Badge */}
        <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
          <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
          <span>404 · Route Not Found</span>
        </div>

        {/* Heading & Subtext */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Student or department not found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400">
            The requested directory entry or path could not be located. It may have
            moved or the identifier might be invalid.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/students"
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
          >
            Return to Students Directory
          </Link>
          <Link
            href="/departments"
            className="rounded-md border border-[#23314d] bg-[#141d30] px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-[#1a253d]"
          >
            Browse All Departments
          </Link>
        </div>

        {/* Suggested Starting Points Panel */}
        <div className="mt-12 w-full max-w-xl overflow-hidden rounded-xl border border-[#1e293b] bg-[#101726] text-left shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1e293b] bg-[#0c1220] px-5 py-3 text-xs">
            <span className="font-semibold uppercase tracking-wider text-slate-300">
              Suggested starting points
            </span>
            <span className="text-slate-500 font-mono">Internal Routes</span>
          </div>

          <ul className="divide-y divide-[#1e293b]">
            {suggestedRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className="group flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-[#131b2e]"
                >
                  <div>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-blue-300 transition-colors">
                      {route.label}
                    </span>
                    <p className="text-xs text-slate-500">{route.description}</p>
                  </div>
                  <span className="flex items-center gap-2 font-mono text-xs text-slate-400 group-hover:text-blue-400 transition-colors">
                    <span>{route.path}</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

    </div>
  );
}