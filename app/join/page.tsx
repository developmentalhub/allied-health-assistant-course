import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircleHeart,
  Sparkles,
  UsersRound,
  Video,
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
            managers and clinics. More community features, tools and resources
            are coming soon.
          </p>
        </div>

        <section className="mt-10 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
  <div className="mb-6">
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
      Free starter tools
    </p>

    <h2 className="mb-4 text-3xl font-bold">
      Your free AHA tools are ready to use.
    </h2>

    <p className="max-w-3xl text-base leading-relaxed text-[#6b6880]">
      As part of the free AHA community, you can access two starter tools while
      the full member library is being built. These tools are a small taste of
      the practical support being created for AHAs.
    </p>
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    <a
      href="https://allied-health-assistant-course.netlify.app/"
      target="_blank"
      rel="noreferrer"
      className="rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 transition hover:border-[#0f766e] hover:bg-white"
    >
      <h3 className="mb-2 text-xl font-bold">AHA Course Tools Preview</h3>

      <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
        Explore the starter AHA tools and get a feel for the kind of support
        being built inside the hive.
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
      <h3 className="mb-2 text-xl font-bold">Clinic Session Feedback Tool</h3>

      <p className="mb-4 text-sm leading-relaxed text-[#3f5f5a]">
        Reflect after a clinic session, organise observations and prepare
        clearer feedback for the supervising professional.
      </p>

      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        Open free tool
        <span aria-hidden="true">→</span>
      </span>
    </a>
  </div>

  <div className="mt-6 rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
    <p className="text-sm leading-relaxed text-[#6b6880]">
      The free tools are a starting point. The full tool library, monthly
      webinars, recordings and PDFs are included in the $57/month AHA
      Professional Development membership.
    </p>
  </div>
</section>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <section>
            <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Free AHA community
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Join the free community for AHAs who care deeply about helping
              children thrive.
            </h1>

            <p className="mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
              A low-pressure place to browse updates, feel part of the hive and
              help shape what gets built next. You can introduce yourself, or
              simply read quietly until you feel ready.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/community"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Join free community
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-6 py-3 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
              >
                Register for free webinar
                <Video size={18} />
              </Link>
            </div>

            <div className="mt-8 rounded-4x1 border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
                <MessageCircleHeart size={24} />
              </div>

              <h2 className="mb-4 text-3xl font-bold">
                What the free community is for
              </h2>

              <div className="grid gap-3">
                <CheckItem text="Browsing updates and new ideas as the platform grows" />
                <CheckItem text="Feeling less alone in AHA work" />
                <CheckItem text="Sharing what support would help AHAs most" />
                <CheckItem text="Connecting with the hive in a low-pressure way" />
              </div>
            </div>
          </section>

          <aside className="rounded-4x1 border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
              <UsersRound size={24} />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Choose your pathway
            </p>

            <h2 className="mb-5 text-3xl font-bold">
              The free community is one part of the hive.
            </h2>

            <div className="grid gap-4">
              <PathwayBox
                title="Free community"
                text="Free to join. Browse, read updates and connect when you are ready."
                button="Join free"
                href="/community"
              />

              <PathwayBox
                title="Monthly webinars"
                text="Start with the free August webinar, then continue with $57/month access."
                button="View webinar access"
                href="/subscribe"
              />

              <PathwayBox
                title="1:1 support"
                text="Request reflective practice support for a real session, confidence worry or role question."
                button="Request support"
                href="/reflective-practice"
              />
            </div>
          </aside>
        </div>

        <section className="mt-10 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-6 shadow-sm md:p-8">
          <div className="flex gap-3">
            <Sparkles size={24} className="mt-0.5 shrink-0 text-[#0f766e]" />

            <div>
              <h2 className="mb-2 text-xl font-bold">
                Free community and paid membership are separate.
              </h2>

              <p className="text-base leading-relaxed text-[#3f5f5a]">
                The free community is a place to connect and follow the build.
                The $57/month membership includes monthly webinars, member
                library access, PDFs, recordings and tools as they are added.
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 shrink-0 text-[#0f766e]" size={18} />
      <p className="text-base leading-relaxed text-[#5f5b73]">{text}</p>
    </div>
  );
}

function PathwayBox({
  title,
  text,
  button,
  href,
}: {
  title: string;
  text: string;
  button: string;
  href: string;
}) {
  return (
    <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">{text}</p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
      >
        {button}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}