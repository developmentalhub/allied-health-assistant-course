import Link from "next/link";

type SessionCard = {
  tag: string;
  badgeStyle: { backgroundColor: string; color: string };
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  priceNote: string;
  capacity: string;
  minimum: string;
  duration: string;
  highlight?: string;
  cta: string;
  href: string;
  cardStyle: { border: string };
};

function GroupIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebinarOwnerIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WebinarFacilitatorIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 3l1.5 3L23 6.5l-2.5 2.5.5 3.5L18 10.5 15 12.5l.5-3.5L13 6.5l3.5-.5L18 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const sessions: SessionCard[] = [
  {
    tag: "Small Group",
    badgeStyle: { backgroundColor: "#e0f2fe", color: "#0369a1" },
    icon: <GroupIcon />,
    title: "Small Group Sessions",
    description:
      "Intimate expert,led sessions exploring a specific topic together. Structured conversation, peer connection, and practical strategies — all in 60 minutes.",
    price: "$55",
    priceNote: "per family",
    capacity: "Up to 8 families",
    minimum: "Minimum 6 families to run",
    duration: "60 minutes",
    highlight: "Most intimate",
    cta: "See group sessions",
    href: "/sessions?type=Small+Group",
    cardStyle: { border: "1px solid #bae6fd" },
  },
  {
    tag: "Webinar",
    badgeStyle: { backgroundColor: "#fef3c7", color: "#b45309" },
    icon: <WebinarOwnerIcon />,
    title: "Webinars by Our Team",
    description:
      "Live webinars run directly by the Developmental Hub team. Deep,dive presentations on key topics, with live Q&A. Accessible and affordable for any family.",
    price: "$45",
    priceNote: "per family",
    capacity: "Up to 100 families",
    minimum: "Minimum 3 families to run",
    duration: "45 minutes",
    highlight: "Best value",
    cta: "See upcoming webinars",
    href: "/sessions?type=Webinar",
    cardStyle: { border: "1px solid #fde68a" },
  },
  {
    tag: "Specialist Webinar",
    badgeStyle: { backgroundColor: "#f3e8ff", color: "#6b21a8" },
    icon: <WebinarFacilitatorIcon />,
    title: "Specialist Webinars",
    description:
      "Webinars hosted by vetted external specialists and therapists. Expert voices on the topics your family needs most — from sleep to school transitions to anxiety.",
    price: "$79",
    priceNote: "per family",
    capacity: "Up to 100 families",
    minimum: "Minimum 30 families to run",
    duration: "60 minutes",
    cta: "See specialist webinars",
    href: "/sessions?type=Specialist+Webinar",
    cardStyle: { border: "1px solid #e9d5ff" },
  },
];

export default function SessionTypes() {
  const styles = {
    section: {
      maxWidth: "1152px",
      margin: "0 auto",
      padding: "80px 24px",
    },
    textCenter: {
      textAlign: "center" as const,
      marginBottom: "56px",
    },
    subTitle: {
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "0.15em",
      textTransform: "uppercase" as const,
      color: "#6b6880",
      marginBottom: "12px",
    },
    mainTitle: {
      fontSize: "36px",
      fontWeight: 300,
      color: "#1e1b2e",
      letterSpacing: "-0.02em",
      margin: 0,
    },
    leadText: {
      marginTop: "16px",
      color: "#6b6880",
      maxWidth: "512px",
      marginInline: "auto",
      fontSize: "16px",
      lineHeight: 1.6,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
    },
    card: {
      position: "relative" as const,
      display: "flex",
      flexDirection: "column" as const,
      borderRadius: "16px",
      backgroundColor: "#ffffff",
      padding: "28px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    highlightBadge: {
      position: "absolute" as const,
      top: "-12px",
      left: "24px",
      backgroundColor: "#3730a3",
      color: "#ffffff",
      fontSize: "12px",
      fontWeight: 500,
      padding: "4px 12px",
      borderRadius: "999px",
    },
    cardHeader: {
      display: "flex",
      alignItems: "start",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    iconWrapper: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      backgroundColor: "#f0f0fa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#3730a3",
    },
    tagBadge: {
      fontSize: "12px",
      fontWeight: 500,
      padding: "4px 10px",
      borderRadius: "999px",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: 500,
      color: "#1e1b2e",
      marginBottom: "12px",
      lineHeight: 1.3,
    },
    cardDescription: {
      fontSize: "14px",
      color: "#6b6880",
      lineHeight: 1.6,
      marginBottom: "24px",
      flex: 1,
    },
    metaList: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      fontSize: "12px",
      color: "#6b6880",
      marginBottom: "20px",
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    footerRow: {
      display: "flex",
      alignItems: "end",
      justifyContent: "space-between",
      paddingTop: "16px",
      borderTop: "1px solid #f0eee9",
    },
    priceMain: {
      fontSize: "24px",
      fontWeight: 300,
      color: "#1e1b2e",
    },
    priceSub: {
      fontSize: "12px",
      color: "#6b6880",
      marginLeft: "4px",
    },
    ctaLink: {
      fontSize: "14px",
      fontWeight: 500,
      color: "#3730a3",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    disclaimer: {
      marginTop: "32px",
      textAlign: "center" as const,
      fontSize: "12px",
      color: "#6b6880",
    },
  };

  return (
    <section style={styles.section}>

      <div style={styles.textCenter}>
        <p style={styles.subTitle}>How it works</p>
        <h2 style={styles.mainTitle} className="font-display-fallback">
          Three ways to get support
        </h2>
        <p style={styles.leadText}>
          All sessions are live, online, and designed around busy family life.
          No 1:1 appointments — just meaningful group learning.
        </p>
      </div>

      <div style={styles.grid}>
        {sessions.map((session) => (
          <div
            key={session.title}
            style={{ ...styles.card, ...session.cardStyle }}
          >
            {session.highlight && (
              <div style={styles.highlightBadge}>
                {session.highlight}
              </div>
            )}

            <div style={styles.cardHeader}>
              <div style={styles.iconWrapper}>
                {session.icon}
              </div>
              <span style={{ ...styles.tagBadge, ...session.badgeStyle }}>
                {session.tag}
              </span>
            </div>

            <h3 style={styles.cardTitle} className="font-display-fallback">
              {session.title}
            </h3>

            <p style={styles.cardDescription}>
              {session.description}
            </p>

            <div style={styles.metaList}>
              <div style={styles.metaItem}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M9 12v-1a3 3 0 0 0-6 0v1M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM13 12v-1a3 3 0 0 0-2.25-2.9M10.5 4a2 2 0 0 1 0 3.87" strokeLinecap="round" />
                </svg>
                {session.capacity}
              </div>
              <div style={styles.metaItem}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" strokeLinecap="round" />
                </svg>
                {session.duration}
              </div>
              <div style={styles.metaItem}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M7 2v10M4 9l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 13h10" strokeLinecap="round" />
                </svg>
                {session.minimum}
              </div>
            </div>

            <div style={styles.footerRow}>
              <div>
                <span style={styles.priceMain} className="font-display-fallback">
                  {session.price}
                </span>
                <span style={styles.priceSub}>{session.priceNote}</span>
              </div>
              <Link href={session.href} style={styles.ctaLink}>
                {session.cta}
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

          </div>
        ))}
      </div>

      <p style={styles.disclaimer}>
        If the minimum number of families isn't reached 24 hours before the session,
        it will be cancelled and every family receives a full refund automatically.
      </p>

    </section>
  );
}