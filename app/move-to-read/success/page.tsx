"use client";

const PDFS = [
  {
    label: "Level 1: Foundations",
    shortLabel: "Level 1",
    description:
      "Crossing the midline, core gross-motor control and visual tracking — the groundwork everything else sits on.",
    url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-level-1.pdf",
    image:
      "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-hero.jpg",
    color: "#4a8b6d",
  },
  {
    label: "Level 2: Building",
    shortLabel: "Level 2",
    description:
      "Hand-eye coordination, spatial awareness and body-awareness games that sharpen control.",
    url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-level-2.pdf",
    image:
      "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-hero-2.jpg",
    color: "#7B4FA6",
  },
  {
    label: "Level 3: Linking",
    shortLabel: "Level 3",
    description:
      "Movement tied to phonological awareness and visual discrimination — where it meets reading and writing.",
    url: "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-level-3.pdf",
    image:
      "https://pndihjsqkwbjewlulotg.supabase.co/storage/v1/object/public/public-assets/move-to-read-hero-3.jpg",
    color: "#3730a3",
  },
];

export default function MoveToReadSuccessPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#faf8f5",
        fontFamily: "DM Sans, sans-serif",
        color: "#1e1b2e",
      }}
    >
      <style>{`
        @keyframes mtrIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: none;
          }
        }

        .mtr-rise {
          animation: mtrIn .6s ease both;
        }

        .mtr-btn {
          transition: transform .15s ease, box-shadow .15s ease;
        }

        .mtr-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(55, 48, 163, .22);
        }

        .mtr-btn:focus-visible {
          outline: 2px solid #3730a3;
          outline-offset: 3px;
        }

        .mtr-card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 820px) {
          .mtr-card-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mtr-rise {
            animation: none;
          }

          .mtr-btn {
            transition: none;
          }
        }
      `}</style>

      <div
        className="mtr-rise"
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "72px 24px 96px",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#3730a3",
            margin: "0 0 14px",
            textAlign: "center",
          }}
        >
          Move to Read
        </p>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 300,
            margin: "0 0 18px",
            lineHeight: 1.12,
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          Your activity decks are ready
        </h1>

        <p
          style={{
            fontSize: "17px",
            color: "#6b6880",
            lineHeight: 1.7,
            fontWeight: 300,
            margin: "0 auto 34px",
            maxWidth: "620px",
            textAlign: "center",
          }}
        >
          Thank you for purchasing Move to Read. Download all three levels below
          and start gently — a few minutes most days is enough to begin building
          the movement foundations for reading and writing.
        </p>

        <div
          style={{
            backgroundColor: "#f5f4fb",
            border: "1px solid #dedbf4",
            borderLeft: "4px solid #3730a3",
            borderRadius: "16px",
            padding: "18px 22px",
            margin: "0 auto 34px",
            maxWidth: "720px",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              color: "#3a3650",
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 300,
              textAlign: "center",
            }}
          >
            Tip: save this page somewhere safe, or download the PDFs now so you
            can find them again easily.
          </p>
        </div>

        <section className="mtr-card-grid" aria-label="Move to Read downloads">
          {PDFS.map((pdf) => (
            <article
              key={pdf.label}
              style={{
                backgroundColor: "white",
                border: "1px solid #e8e4de",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(30,27,46,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  backgroundColor: "#f1ede7",
                  borderTop: `4px solid ${pdf.color}`,
                }}
              >
                <img
                  src={pdf.image}
                  alt={`${pdf.shortLabel} Move to Read activity`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                  }}
                />

                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "white",
                    backgroundColor: pdf.color,
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  {pdf.shortLabel}
                </span>
              </div>

              <div
                style={{
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    margin: "0 0 8px",
                    color: "#1e1b2e",
                  }}
                >
                  {pdf.label}
                </h2>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b6880",
                    lineHeight: 1.6,
                    margin: "0 0 22px",
                  }}
                >
                  {pdf.description}
                </p>

                <a
                  className="mtr-btn"
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    backgroundColor: pdf.color,
                    color: "white",
                    padding: "14px 18px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <span>Open PDF</span>

                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </section>

        <section
          style={{
            margin: "56px auto 0",
            maxWidth: "760px",
            backgroundColor: "#1e1b2e",
            color: "white",
            borderRadius: "24px",
            padding: "36px 28px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c7d2fe",
              margin: "0 0 12px",
            }}
          >
            Want Robyn to guide the activities?
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 300,
              margin: "0 0 14px",
              lineHeight: 1.15,
            }}
          >
            Join the Developmental Hub
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "#d1d5db",
              lineHeight: 1.7,
              margin: "0 auto 24px",
              maxWidth: "560px",
            }}
          >
            The membership gives you follow-along videos, growing activity
            programs and a calmer way to support reading, writing, movement and
            regulation at home.
          </p>

          <a
            className="mtr-btn"
            href="/pricing"
            style={{
              display: "inline-block",
              backgroundColor: "white",
              color: "#1e1b2e",
              padding: "14px 30px",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Explore the membership
          </a>
        </section>

        <p
          style={{
            fontSize: "13px",
            color: "#9591a6",
            textAlign: "center",
            margin: "28px 0 0",
          }}
        >
          Need help? Email{" "}
          <a
            href="mailto:playmoveimprove@gmail.com"
            style={{
              color: "#3730a3",
              fontWeight: 700,
            }}
          >
            playmoveimprove@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
}