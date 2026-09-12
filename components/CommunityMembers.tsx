"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  UserRound,
  UsersRound,
} from "lucide-react";

type CommunityMember = {
  id: string;
  name?: string | null;
  community_role?: string | null;
  discipline?: string | null;
  location_region?: string | null;
  bio?: string | null;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CommunityMembers() {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadMembers() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/community/members", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Could not load community members.",
        );
      }

      setMembers(
        Array.isArray(data.members) ? data.members : [],
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong loading members.";

      setErrorMessage(message);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <section className="rounded-4xl border border-[#e8e4de] bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-[#0f766e]">
          <UsersRound size={22} />
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Hive community
          </p>

          <h2 className="text-xl font-bold">
            Who you are learning alongside
          </h2>

          <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
            A small snapshot of people who have chosen to be
            visible in the Hive.
          </p>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="text-sm">{errorMessage}</p>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-[#6b6880]">
          Loading members...
        </p>
      ) : null}

      {!loading &&
      !errorMessage &&
      members.length === 0 ? (
        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
          <p className="text-sm leading-relaxed text-[#6b6880]">
            Community profiles will begin appearing here as
            members choose to introduce themselves.
          </p>
        </div>
      ) : null}

      {!loading && members.length > 0 ? (
        <div className="grid gap-3">
          {members.map((member) => {
            const name =
              member.name || "Community member";

            const professionalDetails = [
              member.community_role,
              member.discipline,
            ]
              .filter(Boolean)
              .join(" · ");

            return (
              <article
                key={member.id}
                className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0fdfa] text-sm font-bold text-[#0f766e]">
                    {name === "Community member" ? (
                      <UserRound size={18} />
                    ) : (
                      getInitials(name)
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#1e1b2e]">
                      {name}
                    </p>

                    {professionalDetails ? (
                      <p className="mt-1 text-sm leading-relaxed text-[#0f766e]">
                        {professionalDetails}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                        Part of the Allied Health Hive
                      </p>
                    )}

                    {member.location_region ? (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-[#6b6880]">
                        <MapPin
                          size={13}
                          className="shrink-0"
                        />
                        <span>
                          {member.location_region}
                        </span>
                      </div>
                    ) : null}

                    {member.bio ? (
                      <p className="mt-3 text-sm leading-relaxed text-[#5f5b73]">
                        {member.bio}
                      </p>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}