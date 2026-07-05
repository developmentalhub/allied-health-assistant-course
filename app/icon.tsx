import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "64px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f766e",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          fontSize: "28px",
          fontWeight: 800,
          borderRadius: "14px",
        }}
      >
        A
      </div>
    ),
    size
  );
}