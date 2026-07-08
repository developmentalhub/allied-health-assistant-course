"use server";

import { redirect } from "next/navigation";
import { createClient as createSupabaseAdminClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable.");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable.");
  }

  return createSupabaseAdminClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function createAdminAccount(formData: FormData) {
  const inviteCode = String(formData.get("inviteCode") || "").trim();
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  const expectedCode = process.env.ADMIN_SIGNUP_CODE;

  if (!expectedCode) {
    throw new Error("Missing ADMIN_SIGNUP_CODE environment variable.");
  }

  if (inviteCode !== expectedCode) {
    throw new Error("That admin invite code is not correct.");
  }

  if (!fullName || !email || !password) {
    throw new Error("Please complete all fields.");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const supabaseAdmin = getSupabaseAdmin();

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  const userId = data.user?.id;

  if (!userId) {
    throw new Error("Admin user was not created.");
  }

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .upsert({
      id: userId,
      full_name: fullName,
      role: "admin",
      updated_at: new Date().toISOString(),
    });

  if (profileError) {
    throw new Error(profileError.message);
  }

  redirect("/login?redirect=/admin");
}