import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  MessageCircleQuestion,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";

type WebinarRegistration = {
  id: string;
  name: string;
  email: string;
  question: string | null;
  webinar_title: string | null;
  webinar_date: string | null;
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function WebinarRegistrationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner/webinar-registrations");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const allowedRoles = ["partner", "admin", "superadmin"];

  if (!profile?.role || !allowedRoles.includes(profile.role)) {
    redirect("/dashboard");
  }

  const { data, error } = await supabase
    .from("webinar_registrations")
    .select(
      "id, name, email, question, webinar_title, webinar_date, created_at",
    )
    .order("created_at", { ascending: false });

  const registrations = (data || []) as WebinarRegistration[];

  const grouped = registrations.reduce<
    Record<string, WebinarRegistration[]>
  >((groups, registration) => {
    const key =
      registration.webinar_title?.trim() || "Allied Health Hive Webinar";

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(registration);

    return groups;
  }, {});

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/partner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
          >
            <ArrowLeft size={16} />
            Back to Hive Management
          </Link>
        </div>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                <ShieldCheck size={18} />
                Allied Health Hive Management
              </div>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Webinar registrations
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5f5b73] md:text-lg">
                See who is registering for Allied Health Hive webinars, read
                the questions they have submitted and stay connected to the
                people showing interest in the Hive.
              </p>
            </div>

            <div className="rounded-3xl border border-[#99f6e4] bg-white px-6 py-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                Total registrations
              </p>

              <p className="mt-1 text-4xl font-bold text-[#1e1b2e]">
                {registrations.length}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
          <div className="flex gap-3">
            <ShieldCheck
              size={20}
              className="mt-0.5 shrink-0 text-[#0f766e]"
            />

            <div>
              <p className="font-semibold text-[#1e1b2e]">
                Participant information
              </p>

              <p className="mt-1 text-sm leading-relaxed text-[#3f5f5a]">
                These details are visible inside the protected Hive management
                area so you can understand who is joining your webinars and
                what they would like Robyn and Jess to discuss.
              </p>
            </div>
          </div>
        </section>

        {error ? (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-bold text-red-800">
              Registrations could not be loaded
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-red-700">
              {error.message}
            </p>
          </section>
        ) : null}

        {!error && registrations.length === 0 ? (
          <section className="mt-8 rounded-4xl border border-[#e8e4de] bg-white p-8 text-center shadow-sm">
            <CalendarDays
              size={32}
              className="mx-auto text-[#0f766e]"
            />

            <h2 className="mt-4 text-2xl font-bold">
              No registrations yet
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#6b6880]">
              Webinar registrations will appear here as people register
              through the Allied Health Hive website.
            </p>
          </section>
        ) : null}

        {!error && registrations.length > 0 ? (
          <section className="mt-10 space-y-8">
            {Object.entries(grouped).map(([webinarTitle, people]) => {
              const webinarDate =
                people.find((person) => person.webinar_date)?.webinar_date ||
                null;

              return (
                <div
                  key={webinarTitle}
                  className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8"
                >
                  <div className="flex flex-col gap-4 border-b border-[#e8e4de] pb-6 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
                        Webinar
                      </p>

                      <h2 className="mt-2 text-2xl font-bold">
                        {webinarTitle}
                      </h2>

                      {webinarDate ? (
                        <div className="mt-3 flex items-center gap-2 text-sm text-[#6b6880]">
                          <CalendarDays size={16} />
                          {webinarDate}
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-full bg-[#fff7df] px-4 py-2 text-sm font-semibold text-[#6b5b45]">
                      {people.length}{" "}
                      {people.length === 1
                        ? "registration"
                        : "registrations"}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4">
                    {people.map((registration) => (
                      <article
                        key={registration.id}
                        className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e]">
                                <UserRound size={19} />
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-lg font-bold">
                                  {registration.name}
                                </h3>

                                <a
                                  href={`mailto:${registration.email}`}
                                  className="mt-1 inline-flex items-center gap-2 break-all text-sm font-semibold text-[#0f766e] hover:underline"
                                >
                                  <Mail size={15} />
                                  {registration.email}
                                </a>

                                <p className="mt-2 text-xs text-[#6b6880]">
                                  Registered {formatDate(registration.created_at)}
                                </p>
                              </div>
                            </div>

                            <div className="mt-5 rounded-2xl border border-[#99f6e4] bg-white p-4">
                              <div className="flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                                <MessageCircleQuestion size={17} />
                                Question for Robyn and Jess
                              </div>

                              <p className="mt-2 text-sm leading-relaxed text-[#3f5f5a]">
                                {registration.question?.trim() ||
                                  "No question submitted."}
                              </p>
                            </div>
                          </div>

                          <a
                            href={`mailto:${registration.email}?subject=Allied Health Hive`}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#99f6e4] bg-white px-5 py-3 text-sm font-semibold text-[#0f766e] transition hover:bg-[#f0fdfa]"
                          >
                            <Mail size={16} />
                            Email participant
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        ) : null}
      </div>
    </main>
  );
}