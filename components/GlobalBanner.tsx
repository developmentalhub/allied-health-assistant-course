import Link from "next/link";
import { ArrowRight, Lock, MessageCircle, ShieldCheck } from "lucide-react";

export default function GlobalBanner() {
  return (
    <div className="border-b border-[#99f6e4] bg-[#f0fdfa] px-4 py-3 text-[#1e1b2e]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <ShieldCheck size={16} />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#0f766e]">
              AHA Professional Development
            </p>

            <p className="text-sm leading-relaxed text-[#3f5f5a]">
              Free community open now. Foundation AHA PD, topic videos and
              AHA-specific member tools are being built for the paid library.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Join free community
            <MessageCircle size={15} />
          </Link>

          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-white px-4 py-2 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Member tools
            <Lock size={15} />
          </Link>

          <Link
            href="/subscribe"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
          >
            View PD options
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}