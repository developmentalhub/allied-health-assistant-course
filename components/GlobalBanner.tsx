import Link from "next/link";

export default function GlobalBanner() {
  return (
    <div className="bg-[#1e1b2e] px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-5">
        <p className="m-0 text-base leading-relaxed text-slate-300">
          <strong className="text-white">
            Free AHA community open now.
          </strong>{" "}
          Join the live chat for free, then add your name for the paid members space coming soon.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/join"
            className="whitespace-nowrap rounded-full bg-[#0f766e] px-5 py-2.5 text-base font-semibold text-white transition hover:bg-[#0d6962]"
          >
            Join free community
          </Link>

          <Link
            href="/subscribe"
            className="whitespace-nowrap rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-5 py-2.5 text-base font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
          >
            Paid space coming soon
          </Link>
        </div>
      </div>
    </div>
  );
}