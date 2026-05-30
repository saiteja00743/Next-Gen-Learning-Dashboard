"use client";

export default function LoadingSkeleton() {
  return (
    <section className="space-y-6 animate-pulse">
      {/* Top Welcome Title Skeleton */}
      <header className="space-y-2">
        <div className="h-4 w-36 skeleton" />
        <div className="h-8 w-64 skeleton" />
        <div className="h-4 w-96 max-w-full skeleton" />
      </header>

      {/* Bento Grid Skeleton */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[auto]">
        
        {/* Hero Card Skeleton (spans 4 cols on desktop) */}
        <article className="col-span-1 md:col-span-2 lg:col-span-4 min-h-[220px] glass rounded-2xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden">
          <header className="space-y-3">
            <div className="h-6 w-48 skeleton" />
            <div className="h-10 w-80 max-w-full skeleton" />
            <div className="h-4 w-full max-w-lg skeleton" />
          </header>
          <aside className="flex items-center gap-4 mt-4 md:mt-0 self-end md:self-auto">
            <div className="w-14 h-14 rounded-xl skeleton" />
            <div className="space-y-1.5">
              <div className="h-6 w-16 skeleton" />
              <div className="h-3 w-32 skeleton" />
            </div>
          </aside>
        </article>

        {/* Course Cards (4 items) */}
        {[...Array(4)].map((_, idx) => (
          <article key={idx} className="col-span-1 min-h-[200px] glass rounded-2xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden">
            <header>
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl skeleton" />
                <div className="w-12 h-4 rounded skeleton" />
              </div>
              <div className="space-y-2 mt-4">
                <div className="h-5 w-3/4 skeleton" />
                <div className="h-3 w-1/2 skeleton" />
              </div>
            </header>
            <section className="mt-4 space-y-2">
              <div className="h-3 w-1/4 skeleton" />
              <div className="h-2 w-full skeleton" />
            </section>
          </article>
        ))}

        {/* Activity Card Skeleton (spans 2 cols) */}
        <article className="col-span-1 md:col-span-2 min-h-[300px] glass rounded-2xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden">
          <header className="flex items-center gap-3 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg skeleton" />
            <div className="space-y-1">
              <div className="h-4 w-28 skeleton" />
              <div className="h-3 w-20 skeleton" />
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4">
            <section className="space-y-2">
              <div className="h-3.5 w-24 skeleton" />
              <div className="flex items-end justify-between h-28 pt-2">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-4 bg-neutral-900 rounded-full h-full flex items-end">
                    <div className="w-full skeleton rounded-full" style={{ height: `${20 + i * 10}%` }} />
                  </div>
                ))}
              </div>
            </section>
            <section className="space-y-3">
              <div className="h-3.5 w-28 skeleton" />
              <div className="h-28 rounded-xl skeleton w-full" />
            </section>
          </div>
          <footer className="h-4 w-full skeleton mt-2" />
        </article>

        {/* Stats Cards (4 items) */}
        {[...Array(4)].map((_, idx) => (
          <article key={idx} className="col-span-1 min-h-[140px] glass rounded-2xl p-5 flex flex-col justify-between border border-white/5 relative overflow-hidden">
            <header className="flex justify-between items-start">
              <div className="h-3.5 w-20 skeleton" />
              <div className="w-8 h-8 rounded-lg skeleton" />
            </header>
            <section className="flex items-end justify-between mt-4">
              <div className="h-8 w-16 skeleton" />
              <div className="w-10 h-4 rounded skeleton" />
            </section>
          </article>
        ))}

      </section>
    </section>
  );
}
