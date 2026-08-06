"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

const allowedStatuses = [
  "new",
  "reviewed",
  "contacted",
  "awaiting_response",
  "in_progress",
  "completed",
  "closed",
  "declined",
] as const;

type ManagerRequestStatus = (typeof allowedStatuses)[number];

async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/admin/manager-requests");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw new Error("Your administrator access could not be checked.");
  }

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    redirect("/dashboard");
  }

  return supabase;
}

export async function updateManagerRequestStatus(formData: FormData) {
  const managerRequestId = String(
    formData.get("managerRequestId") || "",
  ).trim();

  const status = String(formData.get("status") || "")
    .trim()
    .toLowerCase() as ManagerRequestStatus;

  if (!managerRequestId) {
    throw new Error("The manager request ID is missing.");
  }

  if (!allowedStatuses.includes(status)) {
    throw new Error("The selected manager request status is not valid.");
  }

  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("manager_pathway_requests")
    .update({
      status,
    })
    .eq("id", managerRequestId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/manager-requests");
}

export async function markManagerRequestReviewed(formData: FormData) {
  const managerRequestId = String(
    formData.get("managerRequestId") || "",
  ).trim();

  if (!managerRequestId) {
    throw new Error("The manager request ID is missing.");
  }

  const supabase = await requireAdmin();

  const { error } = await supabase
    .from("manager_pathway_requests")
    .update({
      status: "reviewed",
    })
    .eq("id", managerRequestId)
    .eq("status", "new");

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/manager-requests");
}