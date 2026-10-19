"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { label: "Students", href: "/students" },
    { label: "Departments", href: "/departments" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e293b] bg-[#0c1220]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/students"
            className="flex items-center gap-2.5 py-4 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <span>Student Directory</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/students"
                  ? pathname === "/students" || pathname.startsWith("/students/")
                  : link.href === "/departments"
                  ? pathname === "/departments" || pathname.startsWith("/departments/")
                  : pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-5 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-400 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>


      </div>
    </header>
  );
}