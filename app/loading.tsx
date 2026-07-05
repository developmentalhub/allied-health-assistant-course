import { Loader2, ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl rounded-3xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
            <ShieldCheck size={30} />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
            AHA Professional Development
          </p>

          <h1 className="mb-5 text-3xl font-bold leading-tight md:text-5xl">
            Loading your foundation reflective PD pathway.
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-[#6b6880] md:text-base">
            Preparing the page, resources and professional development pathways.
          </p>

          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white">
            <Loader2 size={16} className="animate-spin" />
            Loading
          </div>
        </div>
      </section>
    </main>
  );
}