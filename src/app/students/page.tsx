"use client";

import { useState, useMemo } from "react";
import { departments, students } from "@/lib/data";
import StudentCard from "@/components/StudentCard";
export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Filter students based on search query and department dropdown
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        student.name.toLowerCase().includes(q) ||
        student.id.toLowerCase().includes(q) ||
        student.department.toLowerCase().includes(q) ||
        student.specialization?.toLowerCase().includes(q);

      const matchesDept =
        selectedDept === "" ||
        student.department.toLowerCase() === selectedDept.toLowerCase() ||
        student.departmentSlug.toLowerCase() === selectedDept.toLowerCase();

      return matchesSearch && matchesDept;
    });
  }, [search, selectedDept]);

  // Pagination
  const totalStudents = filteredStudents.length;
  const totalPages = Math.max(1, Math.ceil(totalStudents / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + pageSize);

  const displayFrom = totalStudents === 0 ? 0 : startIndex + 1;
  const displayTo = Math.min(startIndex + pageSize, totalStudents);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDeptChange = (value: string) => {
    setSelectedDept(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Students
          </h1>
          <p className="mt-2 text-base text-slate-400">
            Browse students and view their profiles.
          </p>
        </div>

        {/* Toolbar: Search & Department Filter */}
        <div className="mt-8 flex flex-col gap-4 rounded-lg border border-[#1e293b] bg-[#101726] p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          {/* Search Box */}
          <div className="relative flex-1 max-w-xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search students"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-md border border-[#223049] bg-[#0c1220] py-2.5 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="deptFilter"
              className="whitespace-nowrap text-sm font-medium text-slate-400"
            >
              Department:
            </label>
            <div className="relative">
              <select
                id="deptFilter"
                value={selectedDept}
                onChange={(e) => handleDeptChange(e.target.value)}
                className="appearance-none rounded-md border border-[#223049] bg-[#0c1220] py-2.5 pl-3.5 pr-10 text-sm text-slate-200 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">All departments</option>
                {departments.map((dept) => (
                  <option key={dept.slug} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Student Cards Grid */}
        <section className="mt-8">
          {paginatedStudents.length === 0 ? (
            <div className="rounded-lg border border-dashed border-[#1e293b] bg-[#101726]/50 p-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-200">
                No students match your query
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Try searching with a different name, student ID, or change the department filter.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedDept("");
                }}
                className="mt-5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedStudents.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          )}
        </section>

        {/* Pagination & Count */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#1e293b] pt-6 sm:flex-row">
          <p className="text-sm text-slate-400">
            Showing <strong className="text-slate-200 font-semibold">{displayFrom}–{displayTo}</strong> of{" "}
            <strong className="text-slate-200 font-semibold">{totalStudents}</strong> students
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="rounded-md border border-[#223049] bg-[#101726] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-[#141d30] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-2 text-xs font-medium text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="rounded-md border border-[#223049] bg-[#101726] px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-[#141d30] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}