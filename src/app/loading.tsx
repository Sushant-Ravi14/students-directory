export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col bg-[#090d16]">
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        {/* Title skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-9 w-48 rounded-md bg-[#162034]" />
          <div className="h-4 w-72 rounded-md bg-[#131b2e]" />
        </div>

        {/* Toolbar skeleton */}
        <div className="mt-8 flex h-16 animate-pulse items-center justify-between rounded-lg border border-[#1e293b] bg-[#101726] p-4">
          <div className="h-10 w-72 rounded-md bg-[#162034]" />
          <div className="h-10 w-48 rounded-md bg-[#162034]" />
        </div>

        {/* Grid skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse flex-col justify-between rounded-lg border border-[#1e293b] bg-[#101726] p-6"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="h-14 w-14 rounded-xl bg-[#162034]" />
                  <div className="h-6 w-20 rounded bg-[#162034]" />
                </div>
                <div className="mt-6 h-6 w-40 rounded bg-[#162034]" />
                <div className="mt-3 flex gap-2">
                  <div className="h-5 w-24 rounded bg-[#131b2e]" />
                  <div className="h-5 w-16 rounded bg-[#131b2e]" />
                </div>
              </div>
              <div className="mt-6 border-t border-[#1e293b] pt-4">
                <div className="h-4 w-28 rounded bg-[#162034]" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
