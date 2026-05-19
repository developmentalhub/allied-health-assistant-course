import Navbar from "@/components/Navbar";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import FacilitatorSessionDetail from "./FacilitatorSessionDetail";

interface Props {
  params: Promise<{ id: string }>
}

export default async function FacilitatorSessionDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login?redirect=/facilitator-hub/sessions")

  const { data: session, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", id)
    .eq("facilitator_id", user.id)
    .single()

  if (error || !session) redirect("/facilitator-hub/sessions")

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`*, children (id, full_name, date_of_birth, diagnosis)`)
    .eq("session_id", id)

  const { data: notes } = await supabase
    .from("session_notes")
    .select("*")
    .eq("session_id", id)
    .eq("facilitator_id", user.id)
    .order("created_at", { ascending: false })

  const { data: actionItems } = await supabase
    .from("action_items")
    .select("*")
    .eq("session_id", id)
    .eq("facilitator_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />
      <FacilitatorSessionDetail
        session={session}
        bookings={bookings ?? []}
        notes={notes ?? []}
        actionItems={actionItems ?? []}
        facilitatorId={user.id}
      />
    </main>
  )
}
