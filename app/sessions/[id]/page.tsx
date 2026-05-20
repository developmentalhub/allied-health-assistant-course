import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SessionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("id, title, description, session_type, price_cents, capacity, duration_minutes, facilitator_id, scheduled_at")
    .eq("id", id)
    .single();

  if (sessionError || !session) {
    notFound();
  }

  let facilitatorName = "Our Developmental Team";
  
  if (session.facilitator_id) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", session.facilitator_id)
      .single();
      
    if (profile?.name) {
      facilitatorName = profile.name;
    }
  }

  // Dynamic price calculation based on your family-friendly tiers
  let displayPrice = (session.price_cents / 100).toFixed(2);
  if (session.session_type === "Small Group") displayPrice = "45.00";
  else if (session.session_type === "Webinar") displayPrice = "25.00";
  else if (session.session_type === "Specialist Webinar") displayPrice = "35.00";

  const formattedDate = new Date(session.scheduled_at).toLocaleDateString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Dynamic color coding system for borders, text, and badges
  const getThemeStyles = (type: string) => {
    const base = {
      badgeBg: "#f3f4f6",
      badgeText: "#4b5563",
      border: "1px solid #e8e4de",
      accent: "#3730a3",
    };

    if (type === "Small Group") {
      return {
        badgeBg: "#e0f2fe", // Light Blue
        badgeText: "#0369a1",
        border: "1px solid #bae6fd",
        accent: "#0369a1",
      };
    }
    
    if (type === "Webinar") {
      return {
        badgeBg: "#fef3c7", // Light Amber
        badgeText: "#b45309",
        border: "1px solid #fde68a",
        accent: "#b45309",
      };
    }

    if (type === "Specialist Webinar") {
      return {
        badgeBg: "#f3e8ff", // Light Purple
        badgeText: "#6b21a8",
        border: "1px solid #e9d5ff",
        accent: "#6b21a8",
      };
    }

    return base;
  };

  const theme = getThemeStyles(session.session_type);

  // Enforce consistent operational display metrics
  const expectedCapacity = session.session_type === "Small Group" ? 8 : 100;

  const styles = {
    container: {
      maxWidth: "850px",
      margin: "40px auto",
      padding: "32px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      border: theme.border,
      boxShadow: "0 4px 20px rgba(30, 27, 46, 0.04)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      borderBottom: "1px solid #f0eee9",
      paddingBottom: "20px",
      marginBottom: "28px",
    },
    badge: {
      display: "inline-block",
      padding: "6px 14px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: "600",
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
      backgroundColor: theme.badgeBg,
      color: theme.badgeText,
      marginBottom: "16px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "500",
      margin: "0 0 12px 0",
      color: "#1e1b2e",
      fontFamily: "var(--font-display), serif",
      letterSpacing: "-0.01em",
    },
    description: {
      fontSize: "15px",
      lineHeight: "1.7",
      color: "#6b6880",
      marginBottom: "32px",
    },
    metaGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "20px",
      backgroundColor: "#faf8f5",
      padding: "24px",
      borderRadius: "12px",
      border: "1px solid #f0eee9",
      marginBottom: "32px",
    },
    metaItem: {
      display: "flex",
      flexDirection: "column" as const,
    },
    metaLabel: {
      fontSize: "11px",
      textTransform: "uppercase" as const,
      color: "#6b6880",
      fontWeight: "600",
      letterSpacing: "0.05em",
      marginBottom: "6px",
    },
    metaValue: {
      fontSize: "15px",
      fontWeight: "500",
      color: "#1e1b2e",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      display: "inline-block",
      backgroundColor: "#3730a3",
      color: "#ffffff",
      padding: "14px 32px",
      borderRadius: "999px",
      fontWeight: "500",
      fontSize: "15px",
      textDecoration: "none",
      textAlign: "center" as const,
      boxShadow: "0 2px 8px rgba(55, 48, 163, 0.15)",
    },
    guaranteeBox: {
      backgroundColor: "#f0fdf4", 
      borderLeft: "4px solid #16a34a", 
      padding: "20px", 
      borderRadius: "0 12px 12px 0", 
      marginBottom: "32px",
    },
  };

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <div style={styles.badge}>{session.session_type}</div>
        <h1 style={styles.title}>{session.title}</h1>
        <p style={{ margin: 0, color: "#6b6880", fontSize: "14px" }}>
          Led by <span style={{ fontWeight: "500", color: "#1e1b2e" }}>{facilitatorName}</span>
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
          <span style={styles.metaValue}>{expectedCapacity} spots available</span>
        </div>
        <div style={styles.metaItem}>
          <span style={styles.metaLabel}>Investment</span>
          <span style={styles.metaValue}>${displayPrice} AUD</span>
        </div>
      </section>

      {/* Conditionally displays the Guarantee text block ONLY for small group sessions */}
      {session.session_type === "Small Group" && (
        <section style={styles.guaranteeBox}>
          <h3 style={{ margin: "0 0 6px 0", color: "#14532d", fontSize: "15px", fontWeight: "600" }}>
            Our Small Group Guarantee
          </h3>
          <p style={{ margin: 0, color: "#166534", fontSize: "14px", lineHeight: "1.6" }}>
            To ensure a high,quality experience, our small group programs require a minimum of 6 families to go ahead. When you register, your payment details are securely processed via Stripe and placed on a temporary hold. We only finalize the payment once 6 families have signed up. If the program cannot go ahead, your hold is released automatically, and you will not be charged a single cent.
          </p>
        </section>
      )}

      <div style={styles.btnContainer}>
        <Link href={`/checkout?session_id=${session.id}`} style={styles.button}>
          Book Now
        </Link>
      </div>
    </main>
  );
}