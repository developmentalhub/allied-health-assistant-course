import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  UserPlus,
  UsersRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";

import {
  addTeamMember,
  removeTeamMember,
} from "./actions";

type TeamMember = {
  id: string;
  email: string;
  full_name: string | null;
  status: "active" | "removed";
};

export default async function PartnerTeamPage({
  searchParams,
}: {
  searchParams: Promise<{
    added?: string;
    removed?: string;
    error?: string;
  }>;
}) {
  const messages = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/partner/team");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (
    !profile?.role ||
    !["partner", "admin", "superadmin"].includes(
      profile.role,
    )
  ) {
    redirect("/dashboard");
  }

  const { data } = await supabase
    .from("partner_team_members")
    .select(
      "id, email, full_name, status",
    )
    .eq("partner_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const members =
    (data || []) as TeamMember[];

  const activeMembers = members.filter(
    (member) => member.status === "active",
  );

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/partner"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
        >
          <ArrowLeft size={16} />
          Back to Hive Management
        </Link>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <UsersRound size={26} />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            My AHA team
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Give your AHAs access
          </h1>

          <p className="mt-4 max-w-3xl leading-relaxed text-[#5f5b73]">
            Add the email address your AHA will use to sign into the
            Allied Health Hive. You can manage your own team without
            changing anyone else's access.
          </p>
        </section>

        {messages.added ? (
          <Notice>
            AHA added to your team.
          </Notice>
        ) : null}

        {messages.removed ? (
          <Notice>
            Access has been removed.
          </Notice>
        ) : null}

        {messages.error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {messages.error}
          </div>
        ) : null}

        <section className="mt-8 rounded-4xl border border-[#e8e4de] bg-white p-7 shadow-sm md:p-9">
          <div className="flex items-center gap-3">
            <UserPlus
              size={22}
              className="text-[#0f766e]"
            />

            <h2 className="text-2xl font-bold">
              Add an AHA
            </h2>
          </div>

          <form
            action={addTeamMember}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-semibold"
              >
                Name
              </label>

              <input
                id="fullName"
                name="fullName"
                placeholder="Optional"
                className="mt-2 w-full rounded-2xl border border-[#e8e4de] bg-[#fffdf9] px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-[#e8e4de] bg-[#fffdf9] px-4 py-3 text-sm outline-none focus:border-[#0f766e]"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white"
              >
                <UserPlus size={16} />
                Add to my team
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">
            Current team
          </h2>

          <p className="mt-2 text-sm text-[#6b6880]">
            {activeMembers.length} active team{" "}
            {activeMembers.length === 1
              ? "member"
              : "members"}
          </p>

          <div className="mt-5 grid gap-4">
            {activeMembers.length ? (
              activeMembers.map((member) => {
                const removeAction =
                  removeTeamMember.bind(
                    null,
                    member.id,
                  );

                return (
                  <article
                    key={member.id}
                    className="flex flex-col gap-4 rounded-3xl border border-[#e8e4de] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-bold">
                        {member.full_name ||
                          "AHA team member"}
                      </h3>

                      <p className="mt-1 text-sm text-[#6b6880]">
                        {member.email}
                      </p>
                    </div>

                    <form action={removeAction}>
                      <button
                        type="submit"
                        className="text-sm font-semibold text-[#6b6880] underline"
                      >
                        Remove access
                      </button>
                    </form>
                  </article>
                );
              })
            ) : (
              <div className="rounded-3xl border border-dashed border-[#e8e4de] bg-white p-8 text-center">
                <p className="font-semibold">
                  No AHAs added yet.
                </p>

                <p className="mt-2 text-sm text-[#6b6880]">
                  Add their email above when you are ready.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Notice({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-sm font-semibold text-[#0f766e]">
      {children}
    </div>
  );
}