"use client";

import { useEffect, useState } from "react";
import { UserRound, UsersRound } from "lucide-react";

type CommunityMember = {
  id: string;
  name?: string | null;
  role?: string | null;
  organisation?: string | null;
  location?: string | null;
  created_at?: string | null;
};

function getInitials(name: string) {
  return name
    .split(" ")
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
        throw new Error(data?.error || "Could not load community members.");
      }

      setMembers(Array.isArray(data.members) ? data.members : []);
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
            Members
          </p>

          <h2 className="text-xl font-bold">Who is joining</h2>

          <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
            A small snapshot of people joining the hive.
          </p>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="text-sm">{errorMessage}</p>
        </div>
      ) : null}

      {loading ? (
        <p className="text-sm text-[#6b6880]">Loading members...</p>
      ) : null}

      {!loading && !errorMessage && members.length === 0 ? (
        <div className="rounded-3xl border border-[#e8e4de] bg-[#faf8f5] p-5">
          <p className="text-sm leading-relaxed text-[#6b6880]">
            Members will appear here as people join the community.
          </p>
        </div>
      ) : null}

      {!loading && members.length > 0 ? (
        <div className="grid gap-3">
          {members.map((member) => {
            const name = member.name || "Community member";

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

                  <div className="min-w-0">
                    <p className="font-semibold text-[#1e1b2e]">{name}</p>

                    <p className="mt-1 text-sm leading-relaxed text-[#6b6880]">
                      {[member.role, member.organisation, member.location]
                        .filter(Boolean)
                        .join(" · ") || "Part of the AHA community"}
                    </p>
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