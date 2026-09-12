import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Save,
  UserRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase-server";
import { updateCommunityProfile } from "./actions";

type ProfilePageProps = {
  searchParams?: Promise<{
    saved?: string;
    error?: string;
  }>;
};

export default async function ProfilePage({
  searchParams,
}: ProfilePageProps) {
  const params = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "full_name, role, community_role, discipline, location_region, bio, show_in_community",
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  const backHref =
    profile?.role === "partner"
      ? "/partner"
      : profile?.role === "admin" ||
          profile?.role === "superadmin"
        ? "/admin"
        : "/dashboard";

  return (
    <main className="min-h-screen bg-[#fffaf3] px-5 py-10 text-[#1e1b2e] sm:px-6 md:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e]"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <section className="rounded-4xl border border-[#f4d9a6] bg-linear-to-br from-[#fff7df] via-white to-[#f0fdfa] p-7 shadow-sm md:p-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <UserRound size={27} />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            My Hive profile
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Help people know who they are learning alongside.
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5f5b73]">
            Add a little information about your role and background. Keep it
            broad and professional. You do not need to include your workplace,
            suburb or any private details.
          </p>
        </section>

        {params?.saved === "true" ? (
          <div className="mt-6 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5 text-sm font-semibold text-[#0f766e]">
            Your Hive profile has been updated.
          </div>
        ) : null}

        {params?.error ? (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {decodeURIComponent(params.error)}
          </div>
        ) : null}

        <section className="mt-8 rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
          <form
            action={updateCommunityProfile}
            className="grid gap-6"
          >
            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Your name
              </span>

              <input
                type="text"
                name="fullName"
                required
                defaultValue={profile?.full_name || ""}
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Your role in allied health
              </span>

              <select
                name="communityRole"
                defaultValue={profile?.community_role || ""}
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
              >
                <option value="">
                  Choose your role
                </option>
                <option value="Allied Health Assistant">
                  Allied Health Assistant
                </option>
                <option value="Allied Health Professional">
                  Allied Health Professional
                </option>
                <option value="Manager / Supervisor">
                  Manager / Supervisor
                </option>
                <option value="Student">
                  Student
                </option>
                <option value="Educator">
                  Educator
                </option>
                <option value="Other">
                  Other
                </option>
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                Discipline or area
              </span>

              <input
                type="text"
                name="discipline"
                defaultValue={profile?.discipline || ""}
                placeholder="e.g. Occupational Therapy, Exercise Physiology"
                className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                State or broad region
              </span>

              <div className="relative">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b6880]"
                />

                <input
                  type="text"
                  name="locationRegion"
                  defaultValue={profile?.location_region || ""}
                  placeholder="e.g. Victoria, Australia"
                  className="w-full rounded-2xl border border-[#e8e4de] bg-[#faf8f5] py-3 pl-11 pr-4 text-base outline-none transition focus:border-[#0f766e] focus:bg-white"
                />
              </div>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold">
                A little about you
              </span>

              <textarea
                name="bio"
                rows={5}
                maxLength={500}
                defaultValue={profile?.bio || ""}
                placeholder="Share a short sentence or two about the kind of work you do or what you are hoping to learn from the Hive."
                className="w-full resize-y rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-4 py-3 text-base leading-relaxed outline-none transition focus:border-[#0f766e] focus:bg-white"
              />
            </label>

            <label className="flex items-start gap-3 rounded-3xl border border-[#99f6e4] bg-[#f0fdfa] p-5">
              <input
                type="checkbox"
                name="showInCommunity"
                defaultChecked={profile?.show_in_community ?? true}
                className="mt-1 h-4 w-4"
              />

              <span>
                <span className="flex items-center gap-2 text-sm font-semibold text-[#0f766e]">
                  <BadgeCheck size={16} />
                  Show my profile in the Hive
                </span>

                <span className="mt-1 block text-sm leading-relaxed text-[#3f5f5a]">
                  Other members may see your name, community role, discipline,
                  broad region and short bio.
                </span>
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-[#0f766e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0d6962]"
            >
              <Save size={17} />
              Save my profile
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}