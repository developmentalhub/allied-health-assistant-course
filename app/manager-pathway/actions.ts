"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

const ROBYN_EMAIL = "robyn@playmoveimprove.com.au";
const JESS_EMAIL = "jess@spectrumvillage.com.au";

function cleanText(value: FormDataEntryValue | null) {
  const text = String(value || "").trim();
  return text.length > 0 ? text : null;
}

function parseTeamEmails(value: FormDataEntryValue | null) {
  const text = String(value || "");

  return text
    .split(/[\n,;]+/)
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
    .filter((email, index, array) => array.indexOf(email) === index);
}

export async function submitManagerPathwayRequest(formData: FormData) {
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const phone = cleanText(formData.get("phone"));
  const organisation = cleanText(formData.get("organisation"));
  const role = cleanText(formData.get("role"));
  const teamSize = cleanText(formData.get("teamSize"));
  const disciplines = cleanText(formData.get("disciplines"));
  const supportType = cleanText(formData.get("supportType"));
  const message = cleanText(formData.get("message"));
  const teamEmails = parseTeamEmails(formData.get("teamEmails"));

  if (!fullName || !email) {
    throw new Error("Please add your name and email.");
  }

  if (!organisation) {
    throw new Error("Please add your clinic or organisation.");
  }

  if (!teamSize) {
    throw new Error("Please choose your team size.");
  }

  if (!supportType) {
    throw new Error("Please choose the support you are interested in.");
  }

  const finalMessage = [
    `Team size: ${teamSize}`,
    disciplines ? `Disciplines involved: ${disciplines}` : null,
    `Support requested: ${supportType}`,
    teamEmails.length > 0
      ? `Team emails submitted:\n${teamEmails.join("\n")}`
      : null,
    message ? `Manager notes:\n${message}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  const supabase = await createClient();

  const { data: managerRequest, error } = await supabase
    .from("manager_pathway_requests")
    .insert({
      full_name: fullName,
      email,
      phone,
      organisation,
      role,
      team_size: teamSize,
      message: finalMessage,
      status: "new",
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (teamEmails.length > 0 && managerRequest?.id) {
    const teamRows = teamEmails.map((teamEmail) => ({
      manager_request_id: managerRequest.id,
      email: teamEmail,
      status: "invited",
    }));

    const { error: teamError } = await supabase
      .from("manager_team_members")
      .insert(teamRows);

    if (teamError) {
      throw new Error(teamError.message);
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ||
    "Allied Health Hive <onboarding@resend.dev>";

  if (resendApiKey) {
    try {
      const emailResponse = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [JESS_EMAIL, ROBYN_EMAIL],
            reply_to: email,
            subject: `New Allied Health Hive manager enquiry from ${organisation}`,
            text: [
              "A new manager or organisation enquiry has been submitted to the Allied Health Hive.",
              "",
              `Name: ${fullName}`,
              `Organisation: ${organisation}`,
              `Email: ${email}`,
              `Phone: ${phone || "Not provided"}`,
              `Role: ${role || "Not provided"}`,
              `Team size: ${teamSize}`,
              `Disciplines involved: ${disciplines || "Not provided"}`,
              `Support requested: ${supportType}`,
              "",
              "Manager notes:",
              message || "No additional notes submitted.",
              "",
              "Team email addresses:",
              teamEmails.length > 0
                ? teamEmails.join("\n")
                : "No team email addresses submitted.",
              "",
              "This enquiry has been saved in the Allied Health Hive.",
            ].join("\n"),
          }),
        },
      );

      if (!emailResponse.ok) {
        const responseText = await emailResponse.text();

        console.error(
          "Manager enquiry email was not accepted by Resend:",
          responseText,
        );
      }
    } catch (emailError) {
      console.error(
        "Manager enquiry notification email failed:",
        emailError,
      );
    }
  } else {
    console.log(
      "Manager enquiry saved without notification email:",
      {
        fullName,
        email,
        organisation,
        teamSize,
        supportType,
      },
    );
  }

  redirect("/manager-pathway?success=true");
}