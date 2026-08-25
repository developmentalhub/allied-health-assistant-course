import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Allied Health Hive | Allied Health Workforce Development";

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fffaf3",
          padding: "72px 82px",
          color: "#1e1b2e",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "999px",
              background: "#0f766e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
            }}
          >
            🐝
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
              }}
            >
              Allied Health Hive
            </div>

            <div
              style={{
                marginTop: "6px",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0f766e",
              }}
            >
              Workforce Development
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "950px",
          }}
        >
          <div
            style={{
              fontSize: "62px",
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.03em",
            }}
          >
            Real conversations for real allied health teams.
          </div>

          <div
            style={{
              marginTop: "28px",
              fontSize: "25px",
              lineHeight: 1.45,
              color: "#5f5b73",
            }}
          >
            Practical learning for Allied Health Assistants, Allied Health
            Professionals, managers and supervisors.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e8e4de",
            paddingTop: "28px",
            fontSize: "18px",
            color: "#6b6880",
          }}
        >
          <div>Jess Foster + Robyn Papworth</div>

          <div
            style={{
              color: "#0f766e",
              fontWeight: 700,
            }}
          >
            Allied Health Hive
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}