import Link from "next/link";
import { ArrowRight, ClipboardList, RefreshCw, ShieldCheck } from "lucide-react";

export default function MemberToolsCard() {
  return (
    <section className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-8">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f766e] text-white">
        <ClipboardList size={24} />
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        Member tools
      </p>

      <h2 className="mb-4 text-3xl font-bold text-[#1e1b2e]">
        AHA tools for preparation, reflection and role clarity.
      </h2>

      <p className="mb-5 text-base leading-relaxed text-[#3f5f5a]">
        Access reusable tools that help AHAs prepare for sessions, reflect after
        tricky moments, organise feedback and know when to seek clarification
        from the supervising professional.
      </p>

      <div className="mb-6 grid gap-3">
        <ToolPoint
          icon={<RefreshCw size={17} />}
          text="Use the tools more than once across different sessions and children."
        />
        <ToolPoint
          icon={<ShieldCheck size={17} />}
          text="Designed to support reflective practice without replacing supervision."
        />
        <ToolPoint
          icon={<ClipboardList size={17} />}
          text="More tools will be added as the member library grows."
        />
      </div>

      <Link
        href="/tools"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
      >
        Open AHA tools
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}

function ToolPoint({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <p className="text-sm leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}