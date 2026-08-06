import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  MessageCircle,
  UsersRound,
} from "lucide-react";

export default function GlobalBanner() {
  return (
    <div className="border-b border-[#f4d9a6] bg-[#fff7df] px-4 py-3 text-[#1e1b2e]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Lightbulb size={18} />
          </div>

          <div>
            <p className="text-sm font-bold text-[#1e1b2e]">
              Allied Health Hive | Workforce Development
            </p>

            <p className="text-sm leading-relaxed text-[#6b5b45]">
              Practical ideas, supportive learning and a growing community for
              Allied Health Assistants and their teams.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link
            href="/community"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
          >
            For AHAs
            <MessageCircle size={15} />
          </Link>

          <Link
            href="/manager-pathway"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f4d9a6] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
          >
            For managers
            <UsersRound size={15} />
          </Link>

          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Use free tools
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}