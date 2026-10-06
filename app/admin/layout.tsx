import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ?? null;

  const isAdmin =
    role === "admin" ||
    role === "superadmin";

  if (!isAdmin) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}