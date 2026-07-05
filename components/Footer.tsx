import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const footerLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Free community",
    href: "/join",
  },
  {
    label: "AHA PD options",
    href: "/subscribe",
  },
  {
    label: "Topics",
    href: "/topics",
  },
  {
    label: "Reflective practice",
    href: "/reflective-practice",
  },
  {
    label: "Manager pathway",
    href: "/manager-pathway",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Privacy",
    href: "/privacy",
  },
  {
    label: "Terms",
    href: "/terms",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e4de] bg-white text-[#1e1b2e]">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="mb-2 text-lg font-bold">
              AHA Professional Development
            </p>

            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#6b6880]">
              Foundation reflective professional development for Allied Health
              Assistants, therapy assistants, students, educators, managers and
              the professionals working alongside them.
            </p>

            <div className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-4">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#0f766e]"
                />

                <p className="text-sm leading-relaxed text-[#3f5f5a]">
                  This platform provides reflective professional development and
                  reflective practice support. It does not replace workplace
                  supervision, clinical supervision, delegation, direction,
                  clinical oversight or workplace responsibilities.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Site links
              </p>

              <div className="grid gap-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold text-[#6b6880] transition hover:text-[#0f766e]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Next steps
              </p>

              <div className="grid gap-3">
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Join free community
                  <MessageCircle size={15} />
                </Link>

                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  View AHA PD options
                  <ArrowRight size={15} />
                </Link>

                <a
                  href="https://www.playmoveimprove.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e8e4de] bg-white px-4 py-3 text-sm font-semibold text-[#6b6880] transition hover:border-[#99f6e4] hover:bg-[#f0fdfa] hover:text-[#0f766e]"
                >
                  Play Move Improve
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#e8e4de] pt-5">
          <p className="text-xs leading-relaxed text-[#6b6880]">
            © {new Date().getFullYear()} Play Move Improve. AHA Professional
            Development is a foundation reflective professional development
            pathway created by Robyn Papworth.
          </p>
        </div>
      </section>
    </footer>
  );
}