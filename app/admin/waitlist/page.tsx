import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminWaitlistPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/admin/waitlist");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["admin", "superadmin"].includes(profile?.role ?? "")) {
    redirect("/dashboard");
  }

  const { data: entries } = await supabase
    .from("waitlist")
    .select("*")
    .order("created_at", { ascending: false });

  const interestCounts: Record<string, number> = {};
  const pathwayCounts: Record<string, number> = {};

  entries?.forEach((entry) => {
    const interest = entry.topic || "Not specified";
    const pathway = entry.age_group || "Not specified";

    interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    pathwayCounts[pathway] = (pathwayCounts[pathway] || 0) + 1;
  });

  const sortedInterests = Object.entries(interestCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const thStyle: React.CSSProperties = {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#5f5b73",
    backgroundColor: "#faf8f5",
    borderBottom: "1px solid #e8e4de",
  };

  const tdStyle: React.CSSProperties = {
    padding: "16px",
    fontSize: "15px",
    color: "#1e1b2e",
    borderBottom: "1px solid #f0ede8",
    verticalAlign: "top",
  };

  return (
    <main className="min-h-screen bg-[#faf8f5] px-6 py-14 text-[#1e1b2e] md:py-20">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="mb-8 inline-flex text-base font-semibold text-[#0f766e] hover:underline"
        >
          Back to admin
        </Link>

        <header className="mb-10">
          <p className="mb-4 text-base font-semibold uppercase tracking-[0.14em] text-[#0f766e]">
            Academy waitlist
          </p>

          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
            Waitlist interest
          </h1>

          <p className="max-w-3xl text-xl leading-relaxed text-[#5f5b73]">
            {entries?.length ?? 0} people have joined the academy waitlist.
            Use this page to review pathway interest and decide what to build
            next.
          </p>
        </header>

        {sortedInterests.length > 0 && (
          <section className="mb-8 rounded-3xl border border-[#e8e4de] bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-bold">Interest overview</h2>

            <div className="space-y-4">
              {sortedInterests.map(([interest, count]) => {
                const max = sortedInterests[0][1];
                const pct = Math.round((count / max) * 100);

                return (
                  <div key={interest}>
                    <div className="mb-2 flex justify-between gap-4">
                      <span className="text-base font-semibold text-[#1e1b2e]">
                        {interest}
                      </span>

                      <span className="text-base font-semibold text-[#0f766e]">
                        {count}
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#f0ede8]">
                      <div
                        className="h-full rounded-full bg-[#0f766e]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 border-t border-[#f0ede8] pt-6">
              <h3 className="mb-4 text-xl font-bold">Pathway breakdown</h3>

              <div className="flex flex-wrap gap-4">
                {Object.entries(pathwayCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([pathway, count]) => (
                    <div
                      key={pathway}
                      className="rounded-2xl border border-[#e8e4de] bg-[#faf8f5] px-5 py-4"
                    >
                      <p className="mb-1 text-sm font-semibold uppercase tracking-[0.08em] text-[#5f5b73]">
                        {pathway}
                      </p>

                      <p className="text-3xl font-bold text-[#1e1b2e]">
                        {count}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        <section className="overflow-hidden rounded-3xl border border-[#e8e4de] bg-white shadow-sm">
          {!entries || entries.length === 0 ? (
            <div className="p-10 text-center text-lg text-[#5f5b73]">
              No waitlist entries yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {[
                      "Name",
                      "Email",
                      "Pathway",
                      "Interest",
                      "Message",
                      "Date",
                    ].map((heading) => (
                      <th key={heading} style={thStyle}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td style={tdStyle}>{entry.name}</td>

                      <td style={tdStyle}>
                        <a
                          href={`mailto:${entry.email}`}
                          className="font-semibold text-[#0f766e] hover:underline"
                        >
                          {entry.email}
                        </a>
                      </td>

                      <td style={tdStyle}>{entry.age_group || "—"}</td>

                      <td style={tdStyle}>{entry.topic || "—"}</td>

                      <td
                        style={{
                          ...tdStyle,
                          maxWidth: "260px",
                          color: "#5f5b73",
                        }}
                      >
                        {entry.message || "—"}
                      </td>

                      <td
                        style={{
                          ...tdStyle,
                          whiteSpace: "nowrap",
                          color: "#5f5b73",
                        }}
                      >
                        {entry.created_at
                          ? new Date(entry.created_at).toLocaleDateString(
                              "en-AU",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}