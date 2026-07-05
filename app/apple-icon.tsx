import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "180px",
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f766e",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          fontSize: "78px",
          fontWeight: 800,
          borderRadius: "42px",
        }}
      >
        AHA
      </div>
    ),
    size
  );
}