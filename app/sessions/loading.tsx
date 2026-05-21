export default function SessionsLoading() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#faf8f5",
      padding: "48px 24px",
      fontFamily: "DM Sans, sans-serif",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Heading skeleton */}
        <div style={{ marginBottom: "40px" }}>
          <div style={skeletonStyle(200, 16)} />
          <div style={{ ...skeletonStyle(340, 40), margin: "12px 0 8px" }} />
          <div style={skeletonStyle(260, 20)} />
        </div>

        {/* Card skeletons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e8e4de",
              borderRadius: "16px",
              padding: "28px",
            }}>
              <div style={skeletonStyle(80, 12)} />
              <div style={{ ...skeletonStyle("100%", 24), margin: "12px 0 8px" }} />
              <div style={skeletonStyle("80%", 16)} />
              <div style={{ ...skeletonStyle("60%", 16), marginTop: "8px" }} />
              <div style={{ ...skeletonStyle(100, 36), marginTop: "24px", borderRadius: "999px" }} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
      `}</style>
    </div>
  );
}

function skeletonStyle(width: number | string, height: number): React.CSSProperties {
  return {
    width: typeof width === "number" ? `${width}px` : width,
    height: `${height}px`,
    borderRadius: "6px",
    background: "linear-gradient(90deg, #ede9e3 25%, #f5f2ee 50%, #ede9e3 75%)",
    backgroundSize: "600px 100%",
    animation: "shimmer 1.4s ease-in-out infinite",
  };
}