import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  Lightbulb,
  MessageCircleHeart,
  Sparkles,
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
    <main className="min-h-screen bg-[#fffaf3] text-[#1e1b2e]">
      <section className="px-5 py-10 sm:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
            <div className="grid gap-10 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <img
                  src={siteConfig.logoUrl}
                  alt="Allied Health Hive"
                  className="mb-6 h-24 w-auto object-contain"
                />

                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                  Allied Health Hive | Workforce Development
                </p>

                <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                  Practical support for Allied Health Assistants and the teams
                  who help them thrive.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                  Creative session ideas, reflective tools, live learning and a
                  supportive community for AHAs who want to feel more confident,
                  capable and connected.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                  You do not need to have every answer. Professional confidence
                  grows through practical experience, supportive conversations
                  and knowing when to ask for guidance.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/community"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
                  >
                    Explore support for AHAs
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    href="/manager-pathway"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0f766e] bg-white px-7 py-4 text-base font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                  >
                    Support my AHA team
                    <ArrowRight size={18} />
                  </Link>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#6b6880]">
                  Start with the free tools, webinar and community. No payment
                  details are required.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <ImageCard
                  src={IMAGES.hero}
                  alt="An Allied Health Assistant receiving supportive online mentoring in a therapy room"
                  label="Supportive learning"
                />

                <ImageCard
                  src={IMAGES.scooter}
                  alt="An Allied Health Assistant exploring a practical scooter board activity"
                  label="Creative session ideas"
                />
              </div>
            </div>
          </div>

          <section className="mb-8 grid gap-6 lg:grid-cols-2">
            <AudienceCard
              eyebrow="For Allied Health Assistants"
              title="Feel more confident, creative and supported."
              description="Find practical session ideas, reflective tools and a welcoming community that understands the realities of the AHA role."
              points={[
                "Fresh ideas for real sessions",
                "Support when Plan A does not work",
                "Clearer questions and communication",
                "A place to learn without judgement",
              ]}
              href="/community"
              buttonText="Explore AHA support"
              icon={<HeartHandshake size={27} />}
            />

            <AudienceCard
              eyebrow="For managers and supervisors"
              title="Help your AHA workforce feel capable and connected."
              description="Strengthen your team with practical learning, supportive development and clearer conversations between AHAs and supervising professionals."
              points={[
                "Workforce development for AHAs",
                "Practical team learning",
                "Reflective support",
                "Resources shaped around real workplaces",
              ]}
              href="/manager-pathway"
              buttonText="Explore team development"
              icon={<UsersRound size={27} />}
            />
          </section>

          <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
            <div className="mb-8 max-w-4xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0fdfa] px-4 py-2 text-sm font-semibold text-[#0f766e]">
                <Sparkles size={16} />
                Practical ideas you can use
              </div>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Small ideas can make a meaningful difference.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
                The Allied Health Hive helps AHAs turn simple equipment and
                everyday materials into engaging, purposeful session activities.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Lightbulb size={24} />}
                title="Masking tape pathways"
                description="Use floor lines and shapes for crossing the midline, balance, coordination and gross motor planning."
              />

              <FeatureCard
                icon={<Sparkles size={24} />}
                title="Everyday equipment"
                description="Turn cups, balls, balloons and simple props into playful movement and coordination activities."
              />

              <FeatureCard
                icon={<HeartHandshake size={24} />}
                title="Compassionate adaptations"
                description="Adjust the activity, pace, environment or level of support when participation becomes difficult."
              />

              <FeatureCard
                icon={<MessageCircleHeart size={24} />}
                title="Clearer conversations"
                description="Organise observations and prepare useful questions for supervising allied health professionals."
              />

              <FeatureCard
                icon={<UsersRound size={24} />}
                title="Workforce connection"
                description="Learn alongside other AHAs, managers and professionals who value the contribution AHAs make."
              />

              <FeatureCard
                icon={<Video size={24} />}
                title="Live practical learning"
                description="Join webinars that focus on real challenges, fresh ideas and supportive professional conversations."
              />
            </div>
          </section>

          <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                  Start with free support
                </p>

                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  Choose what would help you most right now.
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#3f5f5a]">
                  Browse quietly, try a practical tool, join the free webinar or
                  connect with the community when you feel ready.
                </p>
              </div>

              <div className="grid gap-3">
                <QuickLink
                  title="Use the free AHA tools"
                  href="/tools"
                  text="Prepare, reflect and organise your questions."
                />

                <QuickLink
                  title="Join the free webinar"
                  href="/subscribe"
                  text="Discover practical ideas for more engaging sessions."
                />

                <QuickLink
                  title="Visit the AHA community"
                  href="/community"
                  text="Read quietly, connect or join the conversation."
                />
              </div>
            </div>
          </section>

          <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-center">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                  Why we created the Hive
                </p>

                <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                  AHAs deserve learning that reflects the real work they do.
                </h2>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                  Allied Health Assistants bring practical skill, care and
                  valuable observations to every session. The Allied Health Hive
                  was created to help AHAs feel valued, prepared and confident
                  enough to keep learning and ask for support when they need it.
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10">
                <img
                  src={IMAGES.community}
                  alt="Allied Health Assistants connecting through the Allied Health Hive community"
                  loading="lazy"
                  className="aspect-square w-full object-cover object-center"
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function ImageCard({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#e8e4de] bg-white shadow-sm">
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="border-t border-[#e8e4de] bg-white px-5 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
          {label}
        </p>
      </div>
    </div>
  );
}

function AudienceCard({
  eyebrow,
  title,
  description,
  points,
  href,
  buttonText,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  href: string;
  buttonText: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
        {icon}
      </div>

      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-bold leading-tight">{title}</h2>

      <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
        {description}
      </p>

      <div className="mt-6 grid gap-3">
        {points.map((point) => (
          <div key={point} className="flex gap-3">
            <Sparkles
              size={17}
              className="mt-0.5 shrink-0 text-[#0f766e]"
            />

            <p className="text-sm leading-relaxed text-[#5f5b73]">{point}</p>
          </div>
        ))}
      </div>

      <Link
        href={href}
        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
      >
        {buttonText}
        <ArrowRight size={16} />
      </Link>
    </article>
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
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">
        {description}
      </p>
    </article>
  );
}

function QuickLink({
  title,
  href,
  text,
}: {
  title: string;
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-[#99f6e4] bg-white p-5 transition hover:border-[#0f766e]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#1e1b2e]">{title}</h3>

          <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
            {text}
          </p>
        </div>

        <ArrowRight
          size={18}
          className="mt-1 shrink-0 text-[#0f766e] transition group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}