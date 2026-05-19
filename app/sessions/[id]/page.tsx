import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: PageProps) {
  // Await params per Next.js 16 requirements
  const { id } = await params;

  // Initialize the Supabase client
  const supabase = await createClient();

  // Query 1: Fetch the session details
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("id, title, description, session_type, price_cents, capacity, duration_minutes, facilitator_id, scheduled_at")
    .eq("id", id)
    .single();

  if (sessionError || !session) {
    notFound();
  }

  // Query 2: Fetch the facilitator profile separately
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", session.facilitator_id)
    .single();

  const facilitatorName = profile?.name || "Unknown Facilitator";

  // Format price and date safely
  const priceInDollars = (session.price_cents / 100).toFixed(2);
  const formattedDate = new Date(session.scheduled_at).toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Inline styles object container
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "24px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#333",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    header: {
      borderBottom: "1px solid #eaeaea",
      paddingBottom: "16px",
      marginBottom: "24px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      margin: "0 0 12px 0",
      color: "#111",
    },
    badge: {
      display: "inline-block",
      backgroundColor: "#e0f2fe",
      color: "#0369a1",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "600",
      textTransform: "uppercase" as const,
    },
    description: {
      fontSize: "16px",
      lineHeight: "1.6",
      color: "#555",
      marginBottom: "24px",
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "16px",
      backgroundColor: "#f9fafb",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "32px",
    },
    metaItem: {
      display: "flex",
      flexDirection: "column" as const,
    },
    metaLabel: {
      fontSize: "12px",
      textTransform: "uppercase" as const,
      color: "#666",
      fontWeight: "600",
      marginBottom: "4px",
    },
    metaValue: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#222",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      display: "inline-block",
      backgroundColor: "#0070f3",
      color: "#fff",
      padding: "14px 28px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "16px",
      textDecoration: "none",
      textAlign: "center" as const,
      transition: "background-color 0.2s",
    },
  };

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <div style={styles.badge}>{session.session_type}</div>
        <h1 style={styles.title}>{session.title}</h1>
        <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
          Led by <span style={{ fontWeight: "600" }}>{facilitatorName}</span>
        </p>
      </header>

      <section>
        <p style={styles.description}>{session.description}</p>
      </section>

      <section style={styles.metaGrid}>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Date & Time</span>
          <span style={styles.metaValue}>{formattedDate}</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Duration</span>
          <span style={styles.metaValue}>{session.duration_minutes} minutes</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Capacity</span>
          <span style={styles.metaValue}>{session.capacity} spots available</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Investment</span>
          <span style={styles.metaValue}>${priceInDollars} AUD</span>
        </div>
      </section>

      <div style={styles.btnContainer}>
        <Link href={`/checkout?session_id=${session.id}`} style={styles.button}>
          Book Now
        </Link>
      </div>
    </main>
  );
}