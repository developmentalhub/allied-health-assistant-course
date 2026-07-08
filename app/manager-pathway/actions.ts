"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

function safeError(message: string) {
  return encodeURIComponent(message);
}

function parseTeamEmails(rawEmails: string) {
  return rawEmails
    .split(/[\n,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
    .filter((email, index, array) => array.indexOf(email) === index);
}

export async function submitManagerPathwayRequest(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const phone = String(formData.get("phone") || "").trim();
  const organisation = String(formData.get("organisation") || "").trim();
  const role = String(formData.get("role") || "").trim();
  const teamSize = String(formData.get("teamSize") || "").trim();
  const teamEmailsRaw = String(formData.get("teamEmails") || "").trim();
  const message = String(formData.get("message") || "").trim();

  const wantsWebinarSeries = formData.get("wantsWebinarSeries") === "on";
  const wantsClinicInduction = formData.get("wantsClinicInduction") === "on";
  const wantsGrowthProgram = formData.get("wantsGrowthProgram") === "on";
  const wantsTeamQuote = formData.get("wantsTeamQuote") === "on";

  if (!fullName || !email || !organisation) {
    redirect(
      `/manager-pathway?error=${safeError(
        "Please include your name, email and organisation."
      )}`
    );
  }

  const teamEmails = parseTeamEmails(teamEmailsRaw);

  const interestSummary = [
    wantsWebinarSeries ? "Webinar series access for team" : null,
    wantsClinicInduction ? "Future clinic induction program" : null,
    wantsGrowthProgram ? "Future clinic growth program" : null,
    wantsTeamQuote ? "Team or clinic quote" : null,
  ]
    .filter(Boolean)
    .join(", ");

  const finalMessage = [
    interestSummary ? `Interested in: ${interestSummary}` : null,
    teamEmails.length > 0
      ? `Team emails submitted:\n${teamEmails.join("\n")}`
      : null,
    message ? `Manager notes:\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const supabase = await createClient();

  const { data: managerRequest, error: managerRequestError } = await supabase
    .from("manager_pathway_requests")
    .insert({
      full_name: fullName,
      email,
      phone: phone || null,
      organisation,
      role: role || null,
      team_size: teamSize || null,
      message: finalMessage || null,
      status: "new",
    })
    .select("id")
    .single();

  if (managerRequestError) {
    redirect(`/manager-pathway?error=${safeError(managerRequestError.message)}`);
  }

  if (!managerRequest?.id) {
    redirect(
      `/manager-pathway?error=${safeError(
        "The manager request was not created properly. Please try again."
      )}`
    );
  }

  if (teamEmails.length > 0) {
    const teamRows = teamEmails.map((teamEmail) => ({
      manager_request_id: managerRequest.id,
      email: teamEmail,
      status: "invited",
    }));

    const { error: teamMembersError } = await supabase
      .from("manager_team_members")
      .insert(teamRows);

    if (teamMembersError) {
      redirect(`/manager-pathway?error=${safeError(teamMembersError.message)}`);
    }
  }

  redirect("/manager-pathway?success=true");
}