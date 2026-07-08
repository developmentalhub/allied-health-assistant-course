import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  UsersRound,
  Video,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const IMAGE_BASE =
  "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images";

const IMAGES = {
  hero: `${IMAGE_BASE}/hero-online-support.png`,
  scooter: `${IMAGE_BASE}/scooter-board-mentoring.png`,
  community: `${IMAGE_BASE}/community-connection.png`,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#1e1b2e]">
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
         <div className="mx-auto mb-8 max-w-4xl overflow-hidden rounded-3xl border border-[#e8e4de] bg-white shadow-sm">
  <img
    src={IMAGES.hero}
    alt="An allied health assistant supported online by a mentor in a clinic therapy room"
    className="h-72 w-full object-cover object-center md:h-80"
  />
</div>

          <div className="mb-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-[#1e1b2e]">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Built with AHAs, for AHAs
            </p>

            <p className="mt-2 text-base leading-relaxed text-[#3f5f5a]">
              We are building this platform from scratch with feedback from
              Allied Health Assistants, managers and clinics. More content,
              resources and support options are coming soon.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-6">
                <img
                  src={siteConfig.logoUrl}
                  alt="Allied Health Hive"
                  className="h-24 w-auto object-contain"
                />
              </div>

              <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                AHA Professional Development
              </p>

              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
                For AHAs who want children to thrive, but do not want to feel
                alone in the work.
              </h1>

              <p className="mb-8 max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
                A supportive hive for Allied Health Assistants who bring skill,
                compassion and care to every session — with practical ideas,
                reflective support and a community that helps you keep growing.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/subscribe"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                >
                  Register for the free August webinar
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/reflective-practice"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-6 py-3 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                >
                  Book 1:1 reflective practice
                </Link>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6b6880]">
                Start with simple therapy ideas, then stay connected through
                monthly PD, resources and reflective support.
              </p>
            </div>

            <div className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Start here
              </p>

              <h2 className="mb-5 text-3xl font-bold">
                Choose the support that fits where you are right now.
              </h2>

              <div className="grid gap-4">
                <PathwayCard
                  icon={<UsersRound size={22} />}
                  title="Join the free community"
                  description="A low-pressure place to browse, connect and feel part of the hive."
                  href="/join"
                  buttonText="Join free community"
                />

                <PathwayCard
                  icon={<Video size={22} />}
                  title="Register for monthly webinars"
                  description="Start with the free August launch webinar, then continue with monthly practical PD."
                  href="/subscribe"
                  buttonText="Register for webinar"
                />

                <PathwayCard
                  icon={<MessageCircleHeart size={22} />}
                  title="Book 1:1 reflective support"
                  description="Talk through a real session, role question or confidence worry with supportive guidance."
                  href="/reflective-practice"
                  buttonText="Book 1:1 support"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold md:text-4xl">
              Practical ideas. Reflective support. A community that sees the
              value AHAs bring.
            </h2>
          </div>

          <div className="mb-8 overflow-hidden rounded-3xl border border-[#e8e4de] bg-white shadow-sm">
            <img
              src={IMAGES.scooter}
              alt="A mentor online guiding an assistant trying a scooter board activity in the therapy room"
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={<Lightbulb size={24} />}
              title="Ideas you can use"
              description="Simple, flexible therapy ideas for real sessions, real children and real clinic days."
            />

            <FeatureCard
              icon={<HeartHandshake size={24} />}
              title="Support for the work"
              description="Reflective practice that helps you build confidence without replacing clinical supervision."
            />

            <FeatureCard
              icon={<UsersRound size={24} />}
              title="A place to belong"
              description="A growing hive for AHAs who want to feel inspired, respected and less alone."
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl rounded-3xl border border-[#e8e4de] bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                For managers and clinics
              </p>

              <h2 className="mb-4 text-3xl font-bold">
                Want your AHA team to feel more supported?
              </h2>

              <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#6b6880]">
                Add your team, enquire about monthly webinar access, and let us
                know what kind of induction, reflective practice or clinic
                support would help your AHAs thrive.
              </p>

              <Link
                href="/manager-pathway"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Support my AHA team
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#e8e4de] bg-[#faf8f5]">
              <img
                src={IMAGES.community}
                alt="Allied health assistants connecting online as a supportive community"
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PathwayCard({
  icon,
  title,
  description,
  href,
  buttonText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  buttonText: string;
}) {
  return (
    <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-bold">{title}</h3>

      <p className="mb-4 text-sm leading-relaxed text-[#6b6880]">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] transition hover:text-[#0d6962]"
      >
        {buttonText}
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="text-base leading-relaxed text-[#6b6880]">
        {description}
      </p>
    </article>
  );
}