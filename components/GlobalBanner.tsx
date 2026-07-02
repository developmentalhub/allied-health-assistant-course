import Link from "next/link";

export default function GlobalBanner() {
  return (
    <div className="bg-[#1e1b2e] px-6 py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-3 text-center md:flex-row md:gap-5">
        <p className="m-0 text-base leading-relaxed text-slate-300">
          <strong className="text-white">
            The Allied Health & Educator Resource Academy is being built now.
          </strong>{" "}
          Join the waitlist for updates as new course areas, resources and live
          sessions open.
        </p>

        <Link
          href="/waitlist"
          className="whitespace-nowrap rounded-full bg-[#0f766e] px-5 py-2.5 text-base font-semibold text-white transition hover:bg-[#0d6962]"
        >
          Join the waitlist
        </Link>
      </div>
    </div>
  );
}