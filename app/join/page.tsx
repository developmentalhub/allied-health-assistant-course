import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  MessageCircleHeart,
  UsersRound,
} from "lucide-react";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Built with AHAs, for AHAs
          </p>
          <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
            We are building this platform from scratch with feedback from AHAs,
            managers and clinics. More tools, examples and support options are
            coming soon as the hive grows.
          </p>
        </div>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-12">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Free AHA community
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Join the free AHA community and start with practical support.
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-[#5f5b73]">
              A free space for Allied Health Assistants who want ideas,
              encouragement and a sense that they are not doing this work alone.
              You can browse quietly, read updates, access starter tools and
              join in when you feel ready.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/community"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join free community
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-[#f0fdfa] px-6 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#ccfbf1]"
              >
                Register for free August webinar
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="mb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Free starter tools
            </p>

            <h2 className="mb-4 text-3xl font-bold">
              Your free AHA tools are ready to use.
            </h2>

            <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
              As part of the free AHA community, you can access two starter
              tools while the full member library is being built. These tools
              are a small taste of the practical support being created for AHAs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="https://allied-health-assistant-course.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 transition hover:border-[#0f766e] hover:bg-white"
            >
              <h3 className="mb-2 text-xl font-bold">
                AHA Course Tools Preview
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
                Explore the starter AHA tools and get a feel for the kind of
                support being built inside the hive.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                Open free tool
                <span aria-hidden="true">→</span>
              </span>
            </a>

            <a
              href="https://aha-clinic-session-feedback.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 transition hover:border-[#0f766e] hover:bg-white"
            >
              <h3 className="mb-2 text-xl font-bold">
                Clinic Session Feedback Tool
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
                Reflect after a clinic session, organise observations and
                prepare clearer feedback for the supervising professional.
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                Open free tool
                <span aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </section>

        <section className="mb-8 grid gap-5 md:grid-cols-3">
          <PathwayCard
            icon={<UsersRound size={24} />}
            title="Free community"
            text="Browse updates, access starter tools and connect with other AHAs at your own pace."
          />

          <PathwayCard
            icon={<ClipboardList size={24} />}
            title="Monthly PD"
            text="Join the free August webinar, then continue with monthly AHA Professional Development for $57/month from September."
          />

          <PathwayCard
            icon={<MessageCircleHeart size={24} />}
            title="1:1 support"
            text="Request reflective support when you want to talk through confidence, role clarity or practical session ideas."
          />
        </section>

        <section className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-8 shadow-sm md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                What happens next?
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                Start free, then choose what level of support fits.
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Use the free starter tools straight away." />
                <CheckItem text="Register for the free August webinar if you want live support." />
                <CheckItem text="Join the $57/month membership from September if you want ongoing monthly PD, recordings, PDFs and member tools." />
                <CheckItem text="Managers and clinics can request a team quote from the manager pathway page." />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6">
              <p className="mb-3 text-sm font-semibold text-[#0f766e]">
                For managers and clinics
              </p>

              <p className="mb-5 text-sm leading-relaxed text-[#6b6880]">
                Team access starts at $57/month for up to 5 staff. Larger teams
                or teams wanting 1:1 reflective practice can request a quote.
              </p>

              <Link
                href="/manager-pathway"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
              >
                View manager pathway
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function PathwayCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>
    </article>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#0f766e]" size={18} />
      <p className="text-base leading-relaxed text-[#3f5f5a]">{text}</p>
    </div>
  );
}