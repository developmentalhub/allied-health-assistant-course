import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  HeartHandshake,
  Mail,
  MessageCircleHeart,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | Allied Health Hive Workforce Development",
  description:
    "Contact Allied Health Hive about AHA support, webinars, reflective practice, practical resources, manager pathways and custom workforce development.",
};

const jessEmail = "jess@spectrumvillage.com.au";
const robynEmail = "robyn@playmoveimprove.com.au";

const jessPhoto =
  "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/Headshots/Jess%20Spectrum%20Village%20headshot.jpg";

const robynPhoto =
  "https://aracabetvunmirlfgylv.supabase.co/storage/v1/object/public/website-images/Headshots/Robyn%20Play%20Move%20Improve%20headshot.jpg";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#1e1b2e]">
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-20">
        <section className="mb-8 overflow-hidden rounded-4xl border border-[#f4d9a6] bg-white shadow-sm">
          <div className="grid gap-9 bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-12 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
                Allied Health Hive | Workforce Development
              </p>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                Find the right support without needing to explain everything perfectly.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#5f5b73] md:text-xl">
                Whether you are an AHA, manager, supervisor or clinic owner, choose
                the pathway that best matches what you need.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
                You may be looking for practical session ideas, help after a
                difficult session, webinar support, team development or a custom
                resource. Start with the closest option below.
              </p>

              <a
                href="#contact-pathways"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#0f766e] px-7 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Choose your contact pathway
                <ArrowRight size={18} />
              </a>
            </div>

            <aside className="rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-6 md:p-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
                <HeartHandshake size={27} />
              </div>

              <h2 className="mb-4 text-2xl font-bold">
                You are welcome to start simply
              </h2>

              <div className="grid gap-3 text-sm leading-relaxed text-[#3f5f5a]">
                <p>You do not need a formal enquiry.</p>
                <p>You do not need to know exactly what support you need.</p>
                <p>You can describe what feels difficult or unclear.</p>
                <p>Robyn or Jess can help direct you to the right next step.</p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="contact-pathways"
          className="mb-8 scroll-mt-24 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10"
        >
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Contact pathways
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Choose the option that best matches your question.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880]">
              Each pathway takes you to the most relevant page, form or contact.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <ContactCard
              icon={<MessageCircleHeart size={24} />}
              title="I am an AHA"
              text="For questions about confidence, role clarity, session ideas, communication or practical support."
              href={`mailto:${jessEmail}?subject=Allied Health Assistant enquiry`}
              linkText="Email Jess"
              external
            />

            <ContactCard
              icon={<Building2 size={24} />}
              title="I manage or supervise AHAs"
              text="For workforce development, onboarding, team learning, reflective support or clinic-specific needs."
              href="/manager-pathway"
              linkText="View manager pathway"
            />

            <ContactCard
              icon={<CalendarDays size={24} />}
              title="I need webinar help"
              text="For registration questions, joining links or help confirming your free webinar place."
              href={`mailto:${jessEmail}?subject=AHA webinar registration help`}
              linkText="Email webinar support"
              external
            />

            <ContactCard
              icon={<HeartHandshake size={24} />}
              title="I need reflective support"
              text="For support after a difficult session or help organising questions and practical next steps."
              href="/reflective-practice"
              linkText="Explore reflective support"
            />

            <ContactCard
              icon={<FileText size={24} />}
              title="I need practical resources"
              text="For regulation tools, documentation templates, planning resources, family handouts or activity packs."
              href="/resource-shop"
              linkText="Explore resources"
            />

            <ContactCard
              icon={<UsersRound size={24} />}
              title="I need something custom"
              text="For tailored resources, workforce systems, team training or support designed around your organisation."
              href={`mailto:${robynEmail}?subject=Custom Allied Health Hive enquiry`}
              linkText="Email Robyn"
              external
            />
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-10">
          <div className="mb-8 max-w-4xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
              Meet Robyn and Jess
            </p>

            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Built by professionals who understand the everyday realities of AHA work.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#6b6880] md:text-lg">
              Allied Health Hive brings together practical experience in allied
              health, developmental education, regulation, movement, family
              support and workforce development.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FounderCard
              image={jessPhoto}
              alt="Jess Foster, founder of Spectrum Village"
              name="Jess Foster"
              role="Founder, Spectrum Village"
              text="Jess leads an NDIS-registered autism learning centre and understands the importance of skilled AHAs in helping children and families receive consistent, meaningful support."
              email={jessEmail}
            />

            <FounderCard
              image={robynPhoto}
              alt="Robyn Papworth, founder of Play Move Improve"
              name="Robyn Papworth"
              role="Exercise Physiologist and Developmental Educator"
              text="Robyn brings extensive experience in movement, regulation, child development, practical therapy strategies and professional learning for allied health and education teams."
              email={robynEmail}
            />
          </div>
        </section>

        <section className="mb-8 rounded-4xl border border-[#99f6e4] bg-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Not sure where to begin?
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Start with the closest match.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <QuickLink
                title="Browse the free community"
                text="Read quietly, use practical tools and explore support at your own pace."
                href="/community"
              />

              <QuickLink
                title="Explore learning topics"
                text="Read about preparation, communication, reflection and role confidence."
                href="/topics"
              />

              <QuickLink
                title="Register for the webinar"
                text="Join the free practical AHA webinar with Robyn and Jess."
                href="/subscribe"
              />

              <QuickLink
                title="View practical tools"
                text="Use free preparation and session reflection tools now."
                href="/tools"
              />
            </div>
          </div>
        </section>

        <section className="rounded-4xl bg-[#1e1b2e] p-8 text-white shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.58fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#99f6e4]">
                General enquiry
              </p>

              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Still unsure who to contact?
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#d9d7e5] md:text-lg">
                Email Jess for general Allied Health Hive and AHA enquiries. For
                custom training, resources or organisation support, email Robyn.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
              <a
                href={`mailto:${jessEmail}?subject=General Allied Health Hive enquiry`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0d6962]"
              >
                Email Jess
                <Mail size={17} />
              </a>

              <a
                href={`mailto:${robynEmail}?subject=Allied Health Hive organisation enquiry`}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Email Robyn
                <Mail size={17} />
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  text,
  href,
  linkText,
  external = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
  linkText: string;
  external?: boolean;
}) {
  const className =
    "mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]";

  return (
    <article className="flex flex-col rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0f766e]">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-[#6b6880]">
        {text}
      </p>

      {external ? (
        <a href={href} className={className}>
          {linkText}
          <ArrowRight size={15} />
        </a>
      ) : (
        <Link href={href} className={className}>
          {linkText}
          <ArrowRight size={15} />
        </Link>
      )}
    </article>
  );
}

function FounderCard({
  image,
  alt,
  name,
  role,
  text,
  email,
}: {
  image: string;
  alt: string;
  name: string;
  role: string;
  text: string;
  email: string;
}) {
  return (
    <article className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-6">
      <div className="mb-5 flex items-center gap-4">
        <img
          src={image}
          alt={alt}
          className="h-20 w-20 rounded-full border border-[#e8e4de] object-cover"
        />

        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm text-[#0f766e]">{role}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>

      <a
        href={`mailto:${email}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
      >
        {email}
        <ArrowRight size={14} />
      </a>
    </article>
  );
}

function QuickLink({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl border border-[#99f6e4] bg-white p-5 transition hover:border-[#0f766e]"
    >
      <h3 className="mb-2 text-lg font-bold">{title}</h3>

      <p className="text-sm leading-relaxed text-[#6b6880]">{text}</p>

      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
        Continue
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}