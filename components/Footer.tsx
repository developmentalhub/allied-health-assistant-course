import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  HeartHandshake,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "For Allied Health Assistants", href: "/community" },
  { label: "For managers and supervisors", href: "/manager-pathway" },
  { label: "Practical AHA tools", href: "/tools" },
  { label: "Webinars", href: "/webinars" },
  { label: "Resource shop", href: "/resource-shop" },
  { label: "Reflective support", href: "/reflective-practice" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e4de] bg-white text-[#1e1b2e]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <img
              src={siteConfig.logoUrl}
              alt="Allied Health Hive"
              className="mb-5 h-16 w-auto object-contain"
            />

            <p className="text-xl font-bold">Allied Health Hive</p>

            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Workforce Development
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#6b6880]">
              Practical learning, creative session ideas, reflective tools and
              supportive workforce development for Allied Health Assistants and
              the teams who guide them.
            </p>

            <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <div className="flex gap-3">
                <HeartHandshake
                  size={21}
                  className="mt-0.5 shrink-0 text-[#0f766e]"
                />

                <div>
                  <p className="mb-1 font-semibold text-[#1e1b2e]">
                    Learning without judgement
                  </p>

                  <p className="text-sm leading-relaxed text-[#3f5f5a]">
                    AHAs are not expected to know everything. Confidence grows
                    through experience, reflection, practical learning and
                    supportive conversations.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-[#0f766e]"
                />

                <p className="text-xs leading-relaxed text-[#6b6880]">
                  Allied Health Hive provides workforce development and
                  reflective support. It does not replace workplace supervision,
                  clinical supervision, delegation, direction, clinical
                  oversight, incident reporting or employer responsibilities.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Explore the Hive
              </p>

              <div className="grid gap-3">
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f766e]">
                Start here
              </p>

              <div className="grid gap-3">
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Explore support for AHAs
                  <MessageCircle size={15} />
                </Link>

                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-4 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
                >
                  Use practical tools
                  <ArrowRight size={15} />
                </Link>

                <Link
                  href="/manager-pathway"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-4 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Support my AHA team
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

        <div className="mt-10 border-t border-[#e8e4de] pt-6">
          <p className="text-xs leading-relaxed text-[#6b6880]">
            © {new Date().getFullYear()} Allied Health Hive. Workforce
            development for Allied Health Assistants and their teams. Created
            by Jess Foster and Robyn Papworth.
          </p>
        </div>
      </section>
    </footer>
  );
}