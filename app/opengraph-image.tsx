import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const alt = "AHA Professional Development by Play Move Improve";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#faf8f5",
          color: "#1e1b2e",
          fontFamily: "Arial, sans-serif",
          padding: "64px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "2px solid #99f6e4",
            borderRadius: "36px",
            background: "#ffffff",
            padding: "56px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                borderRadius: "999px",
                background: "#f0fdfa",
                color: "#0f766e",
                padding: "14px 24px",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              Foundation reflective PD
            </div>

            <h1
              style={{
                marginTop: "42px",
                marginBottom: "28px",
                fontSize: "74px",
                lineHeight: 1,
                fontWeight: 800,
                maxWidth: "900px",
              }}
            >
              AHA Professional Development
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "900px",
                fontSize: "32px",
                lineHeight: 1.35,
                color: "#5f5b74",
              }}
            >
              Foundation learning, reflection tools, role clarity support and
              professional development pathways for Allied Health Assistants.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#0f766e",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "30px",
                  fontWeight: 700,
                }}
              >
                {siteConfig.businessName}
              </p>

              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "24px",
                  color: "#6b6880",
                }}
              >
                Created by {siteConfig.creator}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                borderRadius: "999px",
                background: "#0f766e",
                color: "#ffffff",
                padding: "18px 28px",
                fontSize: "26px",
                fontWeight: 700,
              }}
            >
              allied-health-assistant-course.vercel.app
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}