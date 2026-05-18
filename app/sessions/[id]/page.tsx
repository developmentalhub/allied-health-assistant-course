import Navbar from "@/components/Navbar";
import Link from "next/link";

const sessionData: Record<string, {
  title: string;
  facilitator: string;
  date: string;
  time: string;
  price: number;
  spots: number;
  spotsLeft: number;
  duration: string;
  type: string;
  tag: string;
  tagColor: string;
  tagText: string;
  borderColor: string;
  cardBackground: string;
  minimum: number;
  description: string;
  whatYoullLearn: string[];
  whoIsThisFor: string;
}> = {
  "1": {
    title: "Sensory Play at Home — Practical Ideas for Everyday Life",
    facilitator: "Dr. Sarah Mitchell",
    date: "Saturday 7 June 2025",
    time: "10:00am AEST",
    price: 39,
    spots: 8,
    spotsLeft: 4,
    duration: "45 minutes",
    type: "group",
    tag: "Small Group",
    tagColor: "#c2410c",
    tagText: "#ffffff",
    borderColor: "#ea580c",
    cardBackground: "#fff7ed",
    minimum: 6,
    description: "Sensory play is one of the most powerful tools parents have for supporting their child's development. In this small group session, Dr. Sarah Mitchell will walk you through practical, low-cost sensory activities you can set up at home today. You will leave with a toolkit of ideas tailored to different sensory needs and ages.",
    whatYoullLearn: [
      "Why sensory play matters for brain development",
      "How to set up a sensory bin with things you already have at home",
      "Activities for children who are sensory seeking vs sensory avoiding",
      "How to recognise when sensory needs are affecting behaviour",
      "Simple ways to embed sensory play into your daily routine",
    ],
    whoIsThisFor: "Parents and carers of children aged 1 to 8 who want practical, evidence-based ideas for supporting sensory development at home. No prior knowledge needed.",
  },
  "2": {
    title: "Building Early Literacy Skills Through Play",
    facilitator: "Dr. James Okafor",
    date: "Wednesday 11 June 2025",
    time: "7:30pm AEST",
    price: 39,
    spots: 8,
    spotsLeft: 6,
    duration: "45 minutes",
    type: "group",
    tag: "Small Group",
    tagColor: "#c2410c",
    tagText: "#ffffff",
    borderColor: "#ea580c",
    cardBackground: "#fff7ed",
    minimum: 6,
    description: "Early literacy is about so much more than learning to read. In this session, Dr. James Okafor shares play-based strategies that build the foundations children need before they ever pick up a book. Perfect for parents who want to support their child's literacy journey in a way that feels natural and fun.",
    whatYoullLearn: [
      "The building blocks of early literacy and why play is central",
      "Games and activities that develop phonological awareness",
      "How to make storytime more interactive and effective",
      "Signs that a child may need extra literacy support",
      "Resources and tools recommended by specialists",
    ],
    whoIsThisFor: "Parents and carers of children aged 2 to 6 who want to build early literacy foundations through everyday play.",
  },
  "3": {
    title: "Understanding Sensory Processing in Young Children",
    facilitator: "Developmental Hub Team",
    date: "Tuesday 17 June 2025",
    time: "12:00pm AEST",
    price: 25,
    spots: 100,
    spotsLeft: 67,
    duration: "60 minutes",
    type: "webinar-owner",
    tag: "Webinar",
    tagColor: "#3730a3",
    tagText: "#ffffff",
    borderColor: "#3730a3",
    cardBackground: "#eef2ff",
    minimum: 30,
    description: "Sensory processing affects how children experience the world around them. This webinar from the Developmental Hub team gives parents a clear, jargon-free introduction to sensory processing, what it looks like in daily life, and how to respond in ways that help rather than overwhelm.",
    whatYoullLearn: [
      "What sensory processing is and how it develops",
      "The eight sensory systems and what they do",
      "How to spot sensory processing differences in your child",
      "Practical strategies for home and school environments",
      "When to seek a professional assessment",
    ],
    whoIsThisFor: "Parents, carers, and educators of children of any age who want a clear introduction to sensory processing.",
  },
  "4": {
    title: "Motor Development — Supporting Your Child's Physical Growth",
    facilitator: "Dr. Priya Sharma",
    date: "Thursday 19 June 2025",
    time: "7:00pm AEST",
    price: 39,
    spots: 8,
    spotsLeft: 3,
    duration: "45 minutes",
    type: "group",
    tag: "Small Group",
    tagColor: "#c2410c",
    tagText: "#ffffff",
    borderColor: "#ea580c",
    cardBackground: "#fff7ed",
    minimum: 6,
    description: "Motor development underpins so much of what children do every day, from holding a pencil to climbing a playground. In this small group session, Dr. Priya Sharma explains the key milestones, how to identify delays early, and what you can do at home to support both gross and fine motor skills.",
    whatYoullLearn: [
      "Gross and fine motor milestones from birth to age 7",
      "Simple exercises and activities to support motor development",
      "How motor skills connect to learning and behaviour",
      "Red flags that suggest a referral may be needed",
      "How to make motor activities part of your everyday routine",
    ],
    whoIsThisFor: "Parents and carers of children aged 0 to 7 who want to understand and support their child's physical development.",
  },
  "5": {
    title: "Play Skills That Support Social Development",
    facilitator: "Dr. Lena Kovacs",
    date: "Monday 23 June 2025",
    time: "11:00am AEST",
    price: 79,
    spots: 100,
    spotsLeft: 44,
    duration: "60 minutes",
    type: "webinar-facilitator",
    tag: "Specialist Webinar",
    tagColor: "#166534",
    tagText: "#ffffff",
    borderColor: "#16a34a",
    cardBackground: "#f0fdf4",
    minimum: 30,
    description: "Play is how children learn to connect with others, manage emotions, and navigate the world. Dr. Lena Kovacs, a specialist in developmental play therapy, explains how different types of play build social skills and what parents can do to create the right conditions for social development to flourish.",
    whatYoullLearn: [
      "The stages of play and what they tell us about development",
      "How to support children who struggle with peer interactions",
      "Activities that build turn-taking, sharing, and empathy",
      "The difference between parallel play and cooperative play",
      "When to seek specialist support for social development",
    ],
    whoIsThisFor: "Parents and carers of children aged 2 to 10 who want to support their child's social development through play.",
  },
  "6": {
    title: "Fine Motor Skills — Activities to Build Strength and Coordination",
    facilitator: "Dr. Marcus Webb",
    date: "Saturday 28 June 2025",
    time: "9:00am AEST",
    price: 79,
    spots: 100,
    spotsLeft: 81,
    duration: "60 minutes",
    type: "webinar-facilitator",
    tag: "Specialist Webinar",
    tagColor: "#166534",
    tagText: "#ffffff",
    borderColor: "#16a34a",
    cardBackground: "#f0fdf4",
    minimum: 30,
    description: "Fine motor skills are the small movements that children use for writing, drawing, cutting, and self-care tasks like doing up buttons. Dr. Marcus Webb, an occupational therapist, shares targeted activities that build hand strength, coordination, and precision in a way that feels like play rather than therapy.",
    whatYoullLearn: [
      "What fine motor skills are and why they matter for school readiness",
      "Age-appropriate activities to build grip strength and hand control",
      "How to spot fine motor difficulties before they affect schoolwork",
      "Tools and materials that support fine motor development at home",
      "Strategies for children who resist fine motor activities",
    ],
    whoIsThisFor: "Parents and carers of children aged 2 to 8 who want to build fine motor foundations at home.",
  },
};

export default function SessionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = sessionData[params.id];

  if (!session) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
        <Navbar />
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "32px", fontWeight: 300, color: "#1e1b2e", marginBottom: "16px" }}>
            Session not found
          </h1>
          <p style={{ color: "#6b6880", marginBottom: "32px" }}>
            This session may have been removed or the link is incorrect.
          </p>
          <Link
            href="/sessions"
            style={{ backgroundColor: "#3730a3", color: "white", padding: "12px 28px", borderRadius: "999px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          >
            Browse all sessions
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#faf8f5" }}>
      <Navbar />

      {/* Back link */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px 0" }}>
        <Link
          href="/sessions"
          style={{ fontSize: "14px", color: "#6b6880", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to all sessions
        </Link>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px 80px", display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px", alignItems: "start" }}>

        {/* Left column */}
        <div>

          {/* Tag */}
          <span style={{ fontSize: "13px", fontWeight: 700, padding: "6px 14px", borderRadius: "8px", backgroundColor: session.tagColor, color: session.tagText, letterSpacing: "0.03em", textTransform: "uppercase", display: "inline-block", marginBottom: "20px" }}>
            {session.tag}
          </span>

          {/* Title */}
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e", lineHeight: 1.3, marginBottom: "12px" }}>
            {session.title}
          </h1>

          {/* Facilitator */}
          <p style={{ fontSize: "15px", color: "#6b6880", marginBottom: "32px" }}>
            Led by {session.facilitator}
          </p>

          {/* Description */}
          <p style={{ fontSize: "16px", color: "#1e1b2e", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>
            {session.description}
          </p>

          {/* What you'll learn */}
          <div style={{ marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 300, color: "#1e1b2e", marginBottom: "20px" }}>
              What you will learn
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {session.whatYoullLearn.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: session.tagColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <svg width="10" height="10" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M2 5l2.5 2.5L8 2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p style={{ fontSize: "15px", color: "#1e1b2e", lineHeight: 1.6, margin: 0 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Who is this for */}
          <div style={{ backgroundColor: session.cardBackground, border: `1.5px solid ${session.borderColor}`, borderRadius: "16px", padding: "24px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 300, color: "#1e1b2e", marginBottom: "12px" }}>
              Who is this for?
            </h2>
            <p style={{ fontSize: "15px", color: "#6b6880", lineHeight: 1.7, margin: 0 }}>
              {session.whoIsThisFor}
            </p>
          </div>

        </div>

        {/* Right column — booking card */}
        <div style={{ position: "sticky", top: "88px" }}>
          <div style={{ backgroundColor: "white", borderRadius: "20px", border: "1px solid #e8e4de", padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

            {/* Price */}
            <div style={{ marginBottom: "20px" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 300, color: "#1e1b2e" }}>
                ${session.price}
              </span>
              <span style={{ fontSize: "13px", color: "#6b6880", marginLeft: "6px" }}>per family</span>
            </div>

            {/* Session details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid #f0eee9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <rect x="1" y="2" width="14" height="13" rx="2"/>
                  <path d="M1 7h14M5 1v2M11 1v2" strokeLinecap="round"/>
                </svg>
                {session.date}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <circle cx="8" cy="8" r="6.5"/>
                  <path d="M8 5v3l2 2" strokeLinecap="round"/>
                </svg>
                {session.time} ({session.duration})
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#1e1b2e" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <path d="M13 14v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
                  <circle cx="8" cy="5" r="3" strokeLinecap="round"/>
                </svg>
                {session.spotsLeft} of {session.spots} spots remaining
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#6b6880" }}>
                <svg width="16" height="16" fill="none" stroke="#6b6880" strokeWidth="1.8">
                  <circle cx="8" cy="8" r="6.5"/>
                  <path d="M8 5v3" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.5" fill="#6b6880"/>
                </svg>
                Minimum {session.minimum} families to run
              </div>
            </div>

            {/* Book button */}
            <Link
              href="/signup"
              style={{ display: "block", width: "100%", backgroundColor: session.tagColor, color: "white", padding: "14px", borderRadius: "999px", fontSize: "15px", fontWeight: 600, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}
            >
              Book this session
            </Link>
            <p style={{ fontSize: "12px", color: "#6b6880", textAlign: "c